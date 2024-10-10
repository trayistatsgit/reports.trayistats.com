const DashboardCards = ({ totalParticipants, completedParticipants, totalRevenue, conversionRate }) => {
    return (
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-purple-200 p-6 rounded-lg">
          <h3 className="text-lg font-bold">Total Participants</h3>
          <p className="text-3xl">{totalParticipants}</p>
        </div>
        <div className="bg-purple-200 p-6 rounded-lg">
          <h3 className="text-lg font-bold">Completed Participants</h3>
          <p className="text-3xl">{completedParticipants}</p>
        </div>
        <div className="bg-purple-200 p-6 rounded-lg">
          <h3 className="text-lg font-bold">Total Revenue</h3>
          <p className="text-3xl">${totalRevenue}</p>
        </div>
        <div className="bg-purple-200 p-6 rounded-lg">
          <h3 className="text-lg font-bold">Conversion Rate</h3>
          <p className="text-3xl">{`${conversionRate.toFixed(2)}%`}</p>
        </div>
      </div>
    );
  };
  
  export default DashboardCards;
  