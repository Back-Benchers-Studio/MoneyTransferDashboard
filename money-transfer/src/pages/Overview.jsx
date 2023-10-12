import { Link } from 'react-router-dom';

function Overview() {
  return (
    <div>
      <h1>Overview Page</h1>
      <Link to="/bankAccounts">Bank Accounts</Link>
      <Link to="/vodafonecashAccounts">Vodafone Cash Accounts</Link>
    </div>
  );
}

export default Overview;