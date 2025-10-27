import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { invoiceData, InvoiceStatus } from "@/data/invoiceData";

const getStatusColor = (status: InvoiceStatus) => {
  switch (status) {
    case 'gezahlt':
      return 'success';
    case 'überfällig':
      return 'error';
    case 'gemahnt':
      return 'warning';
    case 'offen':
      return 'info';
    default:
      return 'primary';
  }
};

export default function RecentOrders() {
  const openInvoices = invoiceData.filter(
    (invoice) =>
      invoice.status === 'offen' ||
      invoice.status === 'überfällig' ||
      invoice.status === 'gemahnt'
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Offene Rechnungen
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Kunden ID
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Betrag
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Fälligkeitsdatum
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Beschreibung
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {openInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="">
                <TableCell className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.id}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.customerId}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.amount.toFixed(2)} {invoice.currency}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.dueDate}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
