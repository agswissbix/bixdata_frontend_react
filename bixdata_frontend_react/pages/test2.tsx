import React from 'react';
import { createServerSidePropsFetcher } from '../utils/fetchData';

interface SidebarProps {
  bixData: {
    userId: number;
    name: string;
    email: string;
  };
}
const menuName='testval';
export const getServerSideProps = createServerSidePropsFetcher<SidebarProps>('http://localhost:8000/backend_custom_test/test/?par1='+menuName,(data) => ({ bixData: data }));

// Mock data for testing
const mockBixData = {
    userId: 123,
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

const SidebarPage: React.FC<SidebarProps> = ({ bixData  }) => {
  return (
    <div>
      <h1>Welcome, {bixData.name}</h1>
      <p>User ID: {bixData.userId}</p>
      <p>Email: {bixData.email}</p>
      {/* Sidebar content */}
    </div>
  );
};

export default SidebarPage;