/**
 * إدارة الفواتير
 * Invoice Management
 */

class InvoiceService {
  constructor() {
    this.invoices = [];
  }

  // إنشاء فاتورة جديدة
  async createInvoice(invoiceData) {
    try {
      const newInvoice = {
        id: 'INV_' + Date.now(),
        ...invoiceData,
        status: 'pending',
        createdAt: new Date()
      };

      this.invoices.push(newInvoice);
      return newInvoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  // الحصول على الفاتورة
  async getInvoice(invoiceId) {
    try {
      const invoice = this.invoices.find(i => i.id === invoiceId);
      if (!invoice) {
        throw new Error('Invoice not found');
      }
      return invoice;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      throw error;
    }
  }

  // تحديث حالة الفاتورة
  async updateInvoiceStatus(invoiceId, status) {
    try {
      const invoice = this.invoices.find(i => i.id === invoiceId);
      if (!invoice) {
        throw new Error('Invoice not found');
      }

      invoice.status = status;
      invoice.updatedAt = new Date();
      return invoice;
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  }
}

module.exports = new InvoiceService();
