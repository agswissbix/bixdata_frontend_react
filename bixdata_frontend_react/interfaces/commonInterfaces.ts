export interface CommonProps {
    bixData: any; // Replace 'any' with the actual type of your common user data if available
    // Add more shared props here
  }
  
  export interface SidebarProps {
    bixData: {
      userId: number;
      name: string;
      email: string;
    };
  }