import React, { useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import SuperAdminHeader from '../../partials/SuperAdminHeader'; // Replace with actual path to Header component
import SuperAdminSidebar from '../../partials/SuperAdminSidebar'; // Replace with actual path to Sidebar component

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AdminAnalytics = () => {
    // Adjust the dummy data and configurations as needed for admin-specific analytics
    const incomeData = [
        // Example data: adjust accordingly
        { period: new Date(2024, 0), income: 15000 },
        { period: new Date(2024, 1), income: 17000 },
        { period: new Date(2024, 2), income: 25000 },
        // Continue with other months
    ];

    const locationIncomeData = {
        daily: [
            // Example daily data
            { date: new Date(2024, 5, 1), income: 700 },
            { date: new Date(2024, 5, 2), income: 850 },
            // Add more daily data points
        ],
        monthly: [
            // Example monthly data
            { period: new Date(2024, 0), income: 30000 },
            { period: new Date(2024, 1), income: 45000 },
            // Add more monthly data points
        ],
        yearly: [
            // Example yearly data
            { year: new Date(2024, 0), income: 500000 },
            { year: new Date(2023, 0), income: 480000 },
            // Add more yearly data points
        ]
    };

    useEffect(() => {
        // Optionally, perform any setup or data processing here
    }, []);

    const dataPoints = incomeData.map(data => ({
        x: data.period,
        y: data.income
    }));

    const dailyDataPoints = locationIncomeData.daily.map(data => ({
        x: data.date,
        y: data.income
    }));

    const monthlyDataPoints = locationIncomeData.monthly.map(data => ({
        x: data.period,
        y: data.income
    }));

    const yearlyDataPoints = locationIncomeData.yearly.map(data => ({
        x: data.year,
        y: data.income
    }));

    const options = {
        animationEnabled: true,
        title: {
            text: "Monthly Income Overview - 2024"
        },
        axisX: {
            valueFormatString: "MMM",
            title: "Month"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: dataPoints
        }]
    };

    const dailyOptions = {
        animationEnabled: true,
        title: {
            text: "Daily Income Overview"
        },
        axisX: {
            valueFormatString: "DD MMM, YYYY",
            title: "Date"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "DD MMM, YYYY",
            type: "spline",
            dataPoints: dailyDataPoints
        }]
    };

    const monthlyOptions = {
        animationEnabled: true,
        title: {
            text: "Monthly Income Overview"
        },
        axisX: {
            valueFormatString: "MMM",
            title: "Month"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: monthlyDataPoints
        }]
    };

    const yearlyOptions = {
        animationEnabled: true,
        title: {
            text: "Yearly Income Overview"
        },
        axisX: {
            valueFormatString: "YYYY",
            title: "Year"
        },
        axisY: {
            title: "Income (in USD)",
            prefix: "$",
            includeZero: false
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "YYYY",
            type: "column",
            dataPoints: yearlyDataPoints
        }]
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <SuperAdminHeader />
            <div className="flex">
                <SuperAdminSidebar />
                <div className="container mx-auto mt-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="w-full">
                            <CanvasJSChart options={options} />
                        </div>
                        <div className="w-full">
                            <CanvasJSChart options={dailyOptions} />
                        </div>
                        <div className="w-full">
                            <CanvasJSChart options={monthlyOptions} />
                        </div>
                        <div className="w-full">
                            <CanvasJSChart options={yearlyOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
