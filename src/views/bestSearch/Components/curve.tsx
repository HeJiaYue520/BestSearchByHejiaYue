import { useEcharts } from "@/hooks/useEcharts";

const Curve = (props: { data: any; titleData: any }) => {
	const { data, titleData } = props;
	const option: any = {
		title: {
			text: `${titleData}`,
			textAlign: "auto",
			left: "3%",
			top: "4%"
		},
		tooltip: {
			trigger: "axis",
			backgroundColor: "transparent",
			axisPointer: {
				type: "none"
			},
			padding: 0,
			formatter: (p: any) => {
				let dom = `<div style="width:100%; height: 70px !important; display:flex;flex-direction: column;justify-content: space-between;padding:10px;box-sizing: border-box;
      color:#fff; background: #6B9DFE;border-radius: 4px;font-size:14px; ">
        <div style="display: flex; align-items: center;"> <div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>日期 :  ${p[0].name}</div>
        <div style="display: flex;align-items: center;"><div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>sv值 :  ${p[0].value}</div>
      </div>`;
				return dom;
			}
		},
		toolbox: {
			show: true,
			orient: "horizontal"
		},
		grid: {
			left: "20%",
			right: "6%"
		},
		dataZoom: [
			{
				show: false,
				height: 10,
				xAxisIndex: [0],
				bottom: 0,
				startValue: 0, //数据窗口范围的起始数值
				endValue: 9, //数据窗口范围的结束数值
				handleStyle: {
					color: "#6b9dfe"
				},
				textStyle: {
					color: "transparent"
				}
			},
			{
				type: "inside",
				show: true,
				height: 0,
				zoomLock: true //控制伸缩
			}
		],
		xAxis: [
			{
				type: "category",
				data: data.map((val: any) => {
					return {
						value: val.date
					};
				}),
				axisTick: {
					show: false
				},
				axisLabel: {
					// interval: time > 4 ? 27 : 0,
					margin: 20,
					interval: 0,
					color: "#a1a1a1",
					fontSize: 14,
					formatter: function (name: string) {
						undefined;
						return name.length > 8 ? name.slice(0, 8) + "..." : name;
					}
				},
				axisLine: {
					lineStyle: {
						color: "#F6F6F7",
						width: 2
					}
				}
			}
		],
		yAxis: [
			{
				min: 0,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						type: "dashed",
						color: "#edeff5",
						width: 2
					}
				},
				axisLabel: {
					color: "#a1a1a1",
					fontSize: 16,
					fontWeight: 400,
					formatter: function (value: number) {
						if (value === 0) {
							return value;
						} else if (value >= 10000) {
							return value / 10000 + "w";
						}
						return value;
					}
				}
			}
		],
		series: [
			{
				name: "Direct",
				type: "bar",
				data: data.map((val: any) => {
					return {
						value: val.sv
					};
				}),
				barWidth: "45px",
				itemStyle: {
					color: "#C5D8FF",
					borderRadius: [12, 12, 0, 0]
				},
				emphasis: {
					itemStyle: {
						color: "#6B9DFE"
					}
				}
			}
		]
	};
	const [echartsRef] = useEcharts(option, data);
	return <div ref={echartsRef} className="content-box"></div>;
};

export default Curve;
