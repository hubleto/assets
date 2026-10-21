import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== entries =====

const communityAppsFolder = path.resolve(__dirname, '../erp/apps');

let entries = {
  main: './src/Main.tsx',
  'community/AiAssistent': communityAppsFolder + '/AiAssistent/Loader',
  'community/Api': communityAppsFolder + '/Api/Loader',
  'community/AuditLogs': communityAppsFolder + '/AuditLogs/Loader',
  'community/Calendar': communityAppsFolder + '/Calendar/Loader',
  'community/CalendarSync': communityAppsFolder + '/CalendarSync/Loader',
  'community/Cashdesk': communityAppsFolder + '/Cashdesk/Loader',
  'community/Contacts': communityAppsFolder + '/Contacts/Loader',
  'community/Customers': communityAppsFolder + '/Customers/Loader',
  'community/Dashboards': communityAppsFolder + '/Dashboards/Loader',
  'community/Deals': communityAppsFolder + '/Deals/Loader',
  'community/Desktop': communityAppsFolder + '/Desktop/Loader',
  'community/Developer': communityAppsFolder + '/Developer/Loader',
  'community/Documents': communityAppsFolder + '/Documents/Loader',
  'community/EmailMarketing': communityAppsFolder + '/EmailMarketing/Loader',
  'community/HrAttendance': communityAppsFolder + '/HrAttendance/Loader',
  'community/HrEmployees': communityAppsFolder + '/HrEmployees/Loader',
  'community/HrLeave': communityAppsFolder + '/HrLeave/Loader',
  'community/HrPerformance': communityAppsFolder + '/HrPerformance/Loader',
  'community/HrRecruitment': communityAppsFolder + '/HrRecruitment/Loader',
  'community/Invoices': communityAppsFolder + '/Invoices/Loader',
  'community/Leads': communityAppsFolder + '/Leads/Loader',
  'community/Mail': communityAppsFolder + '/Mail/Loader',
  'community/Notifications': communityAppsFolder + '/Notifications/Loader',
  'community/Orders': communityAppsFolder + '/Orders/Loader',
  'community/PriceLists': communityAppsFolder + '/PriceLists/Loader',
  'community/Products': communityAppsFolder + '/Products/Loader',
  'community/Projects': communityAppsFolder + '/Projects/Loader',
  'community/Settings': communityAppsFolder + '/Settings/Loader',
  'community/Shops': communityAppsFolder + '/Shops/Loader',
  'community/Tasks': communityAppsFolder + '/Tasks/Loader',
  'community/Usage': communityAppsFolder + '/Usage/Loader',
  'community/Workflow': communityAppsFolder + '/Workflow/Loader',
  'community/Worksheets': communityAppsFolder + '/Worksheets/Loader',
};

// ===== outputPath =====
const outputPath = path.resolve(__dirname, 'compiled/js');

// ===== modules =====
const modules = [
  path.resolve(__dirname, '../react-ui/node_modules'),
];

// ===== aliases =====
const aliases = {
  '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
  '@hubleto/react-ui': path.resolve(__dirname, '../react-ui'),
  '@hubleto/apps': path.resolve(__dirname, '../erp/apps'),
}

export function init() { return { entries, outputPath, aliases, modules } };