'use static';
//图表方面的内容
import './scss/chart-item.scss';
import React from 'react';
import ReactDom from 'react-dom';
import echarts from 'echarts';
import Loading from '../loading/index';
import {connect} from 'react-redux';
import {getAjkHousePrice} from '../../action/anjukeChart';
import delay from '../../../lib/kit/util/delay';




class HouseChart extends React.Component {
    constructor(props){
        super(props);
        this.delayFn = delay(this.scrollHandler,this,100);
    }
    //组件，在接受到props发生改变的时候调用的
    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        //需要进行比对，防止标题标签，没有发生改
        let {path} = nextProps.routeMatch;
        if(path.indexOf('/house') !== 0){
            return;
        }
        let {area1,area2,shengId} = this.props.routeMatch.params;
        let nextUrlMatchParams = nextProps.routeMatch.params;
        if(nextUrlMatchParams.area1 === area1 && nextUrlMatchParams.area2 === area2 && nextUrlMatchParams.shengId === shengId){
            return;
        }
        //派发action
        this.props.initChart(nextUrlMatchParams.shengId,nextUrlMatchParams.area2);
    }
    //组件在首次初始化 render之前 调用的
    componentWillMount(){
        // console.log(match);
        console.log(this.props.routeMatch);
        window.addEventListener('scroll',this.delayFn.bind(this),false);
    }
    //组件销毁的时候
    componentDidMount(){
        window.removeEventListener('scroll',this.delayFn.bind(this),false);
    }
    render() {
        console.log('render..........');
        let {state,code,result} = this.props.anjukeCityChart.toJS();
        return (
            <div>
                {code != 200 ? <Loading/> : result.map((item,index) => {
                    return (
                        <div key={index} data-name={item.name} className={'chart-item'}>
                            <Loading/>
                        </div>
                    );
                })}
            </div>
        )
    }
    //组件渲染后执行 该方法
    componentDidUpdate(prevProps,prevState){
        this.delayFn();
    }
    //根据滚动距离等，渲染echarts
    scrollHandler(e){
        //this.delayFn(e);
        let {result} = this.props.anjukeCityChart.toJS();
        if(!result){
            return;
        }
        let offsetHeight = window.pageYOffset + window.innerHeight + 300;
        let pNode = ReactDom.findDOMNode(this);
        Array.prototype.forEach.call(pNode.childNodes,(childEl,index) => {
            //console.log(getComputedStyle(childEl).height);
            let elHeight = getComputedStyle(childEl).height.replace('px','') - 0;
            if(elHeight* (index +1) < offsetHeight && childEl.childNodes[0].className === 'spinner'){
                //TODO renderChart
                this.renderChart(childEl,result);
            }
        });
    }
    renderChart(el,data){
        let name = el.dataset.name;
        data.forEach((item,index) => {
            if(item.name === name){
                //数据拼装
                let chart = echarts.init(el);
                let xAlis = [];
                let priceList = [];
                let count = [];

                item.priceInfo.forEach((item) => {
                    let tmp = new Date(item.time);
                    xAlis.push([tmp.getFullYear(),'-',tmp.getMonth() + 1, '-', tmp.getDate()].join(''));
                    priceList.push(item.price);
                    count.push(item.quantity);
                });

                let option = {
                    title: {
                        text: item.name + '-' + item.addr,
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        left: 'left',
                        data: ['平均单价','出售房屋数量']
                    },
                    xAxis: {
                        type: 'category',
                        name: 'x',
                        splitLine: {show: false},
                        data: xAlis
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                        name: 'y'
                    },
                    series: [
                        {
                            name: '平均单价',
                            type: 'line',
                            data: priceList
                        },{
                            name:'出售房屋数量',
                            type:'line',
                            data: count
                        }
                    ]
                };
                chart.setOption(option);
            }
        });
    }
}

function mapStateToProps(state){
    return {
        anjukeCityChart: state.get('anjukeCityChart')
    };
}
function mapDispatchToProps(dispatch){
    return {
        initChart: (...rest) => {
            //console.log(...rest);
            dispatch(getAjkHousePrice(...rest));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseChart);
