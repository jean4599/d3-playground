import * as d3 from 'd3'
import { Feature, FeatureCollection } from 'geojson'
import data from '../data/twGeo.json'
import _ from 'lodash'

const geoData = data as FeatureCollection

const width = 500
const height = 500
const padding = 30

const svg = d3
    .select<Element, Feature>('.mapContainer')
    .attr('height', height)
    .attr('width', width)
const map = svg.append('g')

const x0 = padding
const y0 = padding
const x1 = width - padding * 2
const y1 = height - padding * 2

const projection = d3.geoMercator().fitExtent(
    [
        [x0, y0],
        [x1, y1],
    ],
    geoData
)
const pathGenerator = d3.geoPath().projection(projection)
const mathPath = map
    .selectAll('path')
    .data(geoData.features)
    .join('path')
    .attr('d', pathGenerator) //绘制path
    .attr('stroke-width', 0.2)
    .attr('stroke', '#000000')
    .attr('fill', '#ffffff')


function handleZoom(e) {
    map.attr('transform', e.transform)
}
const zoom = d3.zoom<Element, Feature>().on('zoom', handleZoom)

svg.call(zoom)
