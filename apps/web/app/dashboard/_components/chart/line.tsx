import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ScriptableContext,
    Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
)

type TDataLine = {
    totalCompleted: number
    inProgress: number
    todo: number
}

export default function LineChart({ inProgress, todo, totalCompleted }: TDataLine) {
    const data = () => {
        return {
            labels: ['Todo', 'In progess', 'completed'],
            datasets: [
                {
                    data: [todo, inProgress, totalCompleted],
                    fill: 'start',
                    backgroundColor: (context: ScriptableContext<'line'>) => {
                        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 200)
                        gradient.addColorStop(0, 'rgba(4, 172, 172, 1)')
                        gradient.addColorStop(1, 'rgba(4, 172, 172, 0)')
                        return gradient
                    },
                    borderColor: '#23fff4',
                    borderWidth: 2,
                    pointColor: '#fff',
                    pointStrokeColor: '#23ffff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#23ffff',
                },
            ],
        }
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            line: {
                tension: 0.35,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            filler: {
                propagate: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }
    return <Line data={data()} options={options} />
}
