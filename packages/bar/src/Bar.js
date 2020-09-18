/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { bindDefs, Container, SvgWrapper, CartesianMarkers } from '@nivo/core'
import { Axes, Grid } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import setDisplayName from 'recompose/setDisplayName'
import enhance from './enhance'
import { BarPropTypes } from './props'
import BarAnnotations from './BarAnnotations'

const numFormatter = num => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'K'
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(0) + 'M'
    } else if (num > 1000000000) {
        return (num / 1000000000).toFixed(0) + 'B'
    }
    return num
}

const barWillEnterHorizontal = ({ style }) => ({
    x: style.x.val,
    y: style.y.val,
    width: 0,
    height: style.height.val,
})

const barWillEnterVertical = ({ style }) => ({
    x: style.x.val,
    y: style.y.val + style.height.val,
    width: style.width.val,
    height: 0,
})

const barWillLeaveHorizontal = springConfig => ({ style }) => ({
    x: style.x,
    y: style.y,
    width: spring(0, springConfig),
    height: style.height,
})

const barWillLeaveVertical = springConfig => ({ style }) => ({
    x: style.x,
    y: spring(style.y.val + style.height.val, springConfig),
    width: style.width,
    height: spring(0, springConfig),
})

const percentChange = (a, b) => {
    if (b !== 0) {
        if (a !== 0) {
            return Math.floor(((a - b) / b) * 100)
        }
        return -100
    }
    return Math.floor(a * 100)
}

const Bar = props => {
    const {
        data,
        getIndex,
        keys,

        groupMode,
        layout,
        reverse,
        minValue,
        maxValue,

        margin,
        width,
        height,
        outerWidth,
        outerHeight,
        padding,
        innerPadding,
        valueBy,

        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        enableGridX,
        enableGridY,
        gridXValues,
        gridYValues,

        layers,
        barComponent,
        arrowComponent,

        enableLabel,
        getLabel,
        labelSkipWidth,
        labelSkipHeight,
        getLabelTextColor,

        markers,

        theme,
        getColor,
        defs,
        fill,
        borderRadius,
        borderWidth,
        getBorderColor,

        annotations,

        isInteractive,
        getTooltipLabel,
        tooltipFormat,
        tooltip,
        onClick,
        onMouseEnter,
        onMouseLeave,

        legends,
        arrowIndicators,

        animate,
        motionStiffness,
        motionDamping,
    } = props
    const options = {
        layout,
        reverse,
        data,
        getIndex,
        keys,
        minValue,
        maxValue,
        width,
        height,
        getColor,
        padding,
        innerPadding,
    }
    const result =
        groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options)

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    const willEnter = layout === 'vertical' ? barWillEnterVertical : barWillEnterHorizontal
    const willLeave =
        layout === 'vertical'
            ? barWillLeaveVertical(springConfig)
            : barWillLeaveHorizontal(springConfig)

    const shouldRenderLabel = ({ width, height }) => {
        if (!enableLabel) return false
        if (labelSkipWidth > 0 && width < labelSkipWidth) return false
        if (labelSkipHeight > 0 && height < labelSkipHeight) return false
        return true
    }

    const boundDefs = bindDefs(defs, result.bars, fill, {
        dataKey: 'data',
        targetKey: 'data.fill',
    })

    return (
        <Container
            isInteractive={isInteractive}
            theme={theme}
            animate={animate}
            motionStiffness={motionStiffness}
            motionDamping={motionDamping}
        >
            {({ showTooltip, hideTooltip }) => {
                const commonProps = {
                    borderRadius,
                    borderWidth,
                    enableLabel,
                    labelSkipWidth,
                    labelSkipHeight,
                    showTooltip,
                    hideTooltip,
                    onClick,
                    onMouseEnter,
                    onMouseLeave,
                    theme,
                    getTooltipLabel,
                    tooltipFormat,
                    tooltip,
                }

                let bars
                if (animate === true) {
                    bars = (
                        <TransitionMotion
                            key="bars"
                            willEnter={willEnter}
                            willLeave={willLeave}
                            styles={result.bars.map(bar => ({
                                key: bar.key,
                                data: bar,
                                style: {
                                    x: spring(bar.x, springConfig),
                                    y: spring(bar.y, springConfig),
                                    width: spring(bar.width, springConfig),
                                    height: spring(bar.height, springConfig),
                                },
                            }))}
                        >
                            {interpolatedStyles => (
                                <g>
                                    {interpolatedStyles.map(({ key, style, data: bar }) => {
                                        const baseProps = { ...bar, ...style }

                                        return React.createElement(barComponent, {
                                            key,
                                            ...baseProps,
                                            ...commonProps,
                                            shouldRenderLabel: shouldRenderLabel(baseProps),
                                            width: Math.max(style.width, 0),
                                            height: Math.max(style.height, 0),
                                            label: getLabel(bar.data),
                                            labelColor: getLabelTextColor(baseProps, theme),
                                            borderColor: getBorderColor(baseProps),
                                            theme,
                                        })
                                    })}
                                </g>
                            )}
                        </TransitionMotion>
                    )
                } else {
                    bars = result.bars.map(d =>
                        React.createElement(barComponent, {
                            key: d.key,
                            ...d,
                            ...commonProps,
                            label: getLabel(d.data),
                            shouldRenderLabel: shouldRenderLabel(d),
                            labelColor: getLabelTextColor(d, theme),
                            borderColor: getBorderColor(d),
                            theme,
                        })
                    )
                }

                const arrows = result.bars.map((bar, index) => {
                    const next = result.bars[index + 1]
                    if (!next) return null

                    const a = next.data[valueBy]
                    const b = bar.data[valueBy]
                    const num = percentChange(a, b)

                    if (num === Infinity || isNaN(num) || (a === b && a === 0)) return null

                    const sign = num < 0 ? '' : '+'
                    // const label = Math.abs(num) >= 1000 ? `${sign}>1000%` : `${sign}${num}%`
                    const label = `${sign}${numFormatter(num)}%`
                    return React.createElement(arrowComponent, {
                        key: bar.key,
                        ...commonProps,
                        ...bar,
                        height,
                        labelColor: '#000',
                        borderColor: getBorderColor(bar),
                        shouldRenderLabel: true,
                        color: '#fff',
                        next,
                        label,
                        barCount: result.bars.length,
                    })
                })

                const layerById = {
                    grid: (
                        <Grid
                            key="grid"
                            width={width}
                            height={height}
                            xScale={enableGridX ? result.xScale : null}
                            yScale={enableGridY ? result.yScale : null}
                            xValues={gridXValues}
                            yValues={gridYValues}
                        />
                    ),
                    axes: (
                        <Axes
                            key="axes"
                            xScale={result.xScale}
                            yScale={result.yScale}
                            width={width}
                            height={height}
                            top={axisTop}
                            right={axisRight}
                            bottom={axisBottom}
                            left={axisLeft}
                        />
                    ),
                    bars,
                    markers: (
                        <CartesianMarkers
                            key="markers"
                            markers={markers}
                            width={width}
                            height={height}
                            xScale={result.xScale}
                            yScale={result.yScale}
                            theme={theme}
                        />
                    ),
                    legends: legends.map((legend, i) => {
                        const legendData = getLegendData({
                            from: legend.dataFrom,
                            bars: result.bars,
                            layout,
                            direction: legend.direction,
                            groupMode,
                            reverse,
                        })

                        if (legendData === undefined) return null

                        return (
                            <BoxLegendSvg
                                key={i}
                                {...legend}
                                containerWidth={width}
                                containerHeight={height}
                                data={legendData}
                                theme={theme}
                            />
                        )
                    }),
                    annotations: (
                        <BarAnnotations
                            key="annotations"
                            innerWidth={width}
                            innerHeight={height}
                            bars={result.bars}
                            annotations={annotations}
                            {...motionProps}
                        />
                    ),
                }

                if (arrowIndicators && keys.length === 1) {
                    layerById.arrows = arrows
                }

                return (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        defs={boundDefs}
                        theme={theme}
                    >
                        {layers.map((layer, i) => {
                            if (typeof layer === 'function') {
                                return (
                                    <Fragment key={i}>
                                        {layer({ ...props, ...result, showTooltip, hideTooltip })}
                                    </Fragment>
                                )
                            }
                            return layerById[layer]
                        })}
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

Bar.propTypes = BarPropTypes

export default setDisplayName('Bar')(enhance(Bar))
