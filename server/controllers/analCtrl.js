const allIncomes = async (req, res) => {
	try {
		const allIncomes = {
			todayPercentageChange: 0.5,
			todayRevenue: 100000,
			thisYearIncreaseAmount: 100000,
			thisWeekIncreaseAmount: 100000,
			thisMonthIncreaseAmount: 100000,
		};
		res.status(200).json({ allIncomes });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const chartData = async (req, res) => {
	try {
		const chartData = [
			{
				monthName: "July",
				dailyIncome: [
					{
						day: 23,
						totalIncome: 100,
					},
				],
				year: 2023,
				month: 7,
			},
		];
		res.status(200).json({ chartData });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	allIncomes,
	chartData,
};
