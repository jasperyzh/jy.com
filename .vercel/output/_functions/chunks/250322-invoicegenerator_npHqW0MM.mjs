import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
/* empty css                                           */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$250322Invoicegenerator = createComponent(($$result, $$props, $$slots) => {
  const title = "Invoice Generator";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div class="relative min-h-screen bg-gray-100 py-6 px-4"> <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"> <div class="p-5 bg-teal-500 text-white flex justify-between items-center"> <h1 class="text-2xl font-semibold">Invoice Generator</h1> <button id="theme-toggle" class="px-4 py-2 bg-white text-teal-500 rounded hover:bg-teal-50 transition-colors"> <span class="light-mode">Dark Mode</span> <span class="dark-mode hidden">Light Mode</span> </button> </div> <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6"> <!-- Left column: Form inputs --> <div class="space-y-6"> <!-- Seller Details --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Seller Information</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label> <input type="text" id="seller-name" class="w-full px-3 py-2 border rounded-md" placeholder="Your Company Name" value="Brand Name"> </div> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Address</label> <textarea id="seller-address" class="w-full px-3 py-2 border rounded-md" rows="2" placeholder="Company Address">123 Business Street, City, Country</textarea> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label> <input type="text" id="seller-phone" class="w-full px-3 py-2 border rounded-md" placeholder="Phone Number" value="+1 234 567 890"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" id="seller-email" class="w-full px-3 py-2 border rounded-md" placeholder="Email Address" value="info@brandname.com"> </div> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Logo</label> <div class="flex items-center space-x-3"> <input type="file" id="logo-upload" accept="image/*" class="hidden"> <button id="logo-upload-btn" class="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">Upload Logo</button> <span id="logo-name" class="text-sm text-gray-500">No file chosen</span> </div> </div> </div> </div> <!-- Buyer Details --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Client Information</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Client Name</label> <input type="text" id="client-name" class="w-full px-3 py-2 border rounded-md" placeholder="Client Name" value="Dwyane Clark"> </div> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Address</label> <textarea id="client-address" class="w-full px-3 py-2 border rounded-md" rows="2" placeholder="Client Address">24 Dummy Street Area, Location, Lorem Ipsum, 57800538</textarea> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label> <input type="text" id="client-phone" class="w-full px-3 py-2 border rounded-md" placeholder="Phone Number"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" id="client-email" class="w-full px-3 py-2 border rounded-md" placeholder="Email Address"> </div> </div> </div> <!-- Invoice Details --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Invoice Details</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label> <input type="text" id="invoice-number" class="w-full px-3 py-2 border rounded-md" placeholder="#001" value="52148"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Date</label> <input type="date" id="invoice-date" class="w-full px-3 py-2 border rounded-md" value="2020-02-01"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label> <input type="date" id="invoice-due-date" class="w-full px-3 py-2 border rounded-md" value="2020-02-15"> </div> </div> </div> <!-- Tax and Discount --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Tax & Discount</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label> <input type="number" id="tax-rate" class="w-full px-3 py-2 border rounded-md" placeholder="0.0" value="0.0" min="0" max="100" step="0.1"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label> <input type="number" id="discount-rate" class="w-full px-3 py-2 border rounded-md" placeholder="0.0" value="0.0" min="0" max="100" step="0.1"> </div> </div> </div> <!-- Terms & Notes --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Terms & Notes</h2> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label> <textarea id="terms" class="w-full px-3 py-2 border rounded-md" rows="3" placeholder="Terms and conditions...">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce adipiscing pretium consectetur. Curabitur tempor posuere massa in varius. Pellentesque viverra nisi eu velit mattis, nullam porta.</textarea> </div> </div> <!-- Actions --> <div class="flex flex-wrap gap-3"> <button id="save-invoice" class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"> <i class="fas fa-save mr-2"></i>Save
</button> <button id="load-invoice" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"> <i class="fas fa-folder-open mr-2"></i>Load
</button> <button id="export-pdf" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-file-pdf mr-2"></i>Export PDF
</button> <button id="print-invoice" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"> <i class="fas fa-print mr-2"></i>Print
</button> <button id="reset-form" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"> <i class="fas fa-redo mr-2"></i>Reset
</button> </div> </div> <!-- Right column: Items & Preview --> <div class="space-y-6"> <!-- Line Items --> <div class="border rounded-lg p-4 bg-white"> <div class="flex justify-between items-center mb-3"> <h2 class="text-lg font-semibold text-teal-600">Line Items</h2> <button id="add-item" class="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"> <i class="fas fa-plus mr-1"></i>Add Item
</button> </div> <div class="overflow-x-auto"> <table class="min-w-full border-collapse" id="items-table"> <thead class="bg-gray-50"> <tr> <th class="p-2 text-left text-sm font-medium text-gray-500">Item</th> <th class="p-2 text-right text-sm font-medium text-gray-500">Price</th> <th class="p-2 text-right text-sm font-medium text-gray-500">Qty</th> <th class="p-2 text-right text-sm font-medium text-gray-500">Total</th> <th class="p-2 text-center text-sm font-medium text-gray-500">Action</th> </tr> </thead> <tbody id="line-items"> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Lorem ipsum Dolor"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="50.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="1" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$50.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Pellentesque id neque ligula"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="20.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="3" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$60.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Interdum et malesuada fames"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="10.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="2" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$20.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Vivamus volutpat faucibus"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="90.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="1" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$90.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> </tbody> </table> </div> <!-- Totals --> <div class="mt-4 border-t pt-4"> <div class="flex justify-between items-center py-1"> <span class="text-gray-600">Subtotal:</span> <span id="subtotal" class="font-medium">$220.00</span> </div> <div class="flex justify-between items-center py-1" id="tax-container"> <span class="text-gray-600">Tax (0%):</span> <span id="tax-amount" class="font-medium">$0.00</span> </div> <div class="flex justify-between items-center py-1" id="discount-container"> <span class="text-gray-600">Discount (0%):</span> <span id="discount-amount" class="font-medium">$0.00</span> </div> <div class="flex justify-between items-center py-2 text-lg font-bold border-t mt-2"> <span>Total:</span> <span id="total-amount">$220.00</span> </div> </div> </div> <!-- Invoice Preview --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Invoice Preview</h2> <div id="invoice-preview" class="border rounded p-4 bg-gray-50"> <div class="print-only"> <!-- This will be populated with the invoice HTML for printing --> </div> </div> </div> </div> </div> </div> </div>  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script> <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>    <script>
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Elements
      const addItemBtn = document.getElementById('add-item');
      const lineItemsContainer = document.getElementById('line-items');
      const saveInvoiceBtn = document.getElementById('save-invoice');
      const loadInvoiceBtn = document.getElementById('load-invoice');
      const exportPdfBtn = document.getElementById('export-pdf');
      const printInvoiceBtn = document.getElementById('print-invoice');
      const resetFormBtn = document.getElementById('reset-form');
      const logoUploadBtn = document.getElementById('logo-upload-btn');
      const logoUploadInput = document.getElementById('logo-upload');
      const logoNameSpan = document.getElementById('logo-name');
      const themeToggleBtn = document.getElementById('theme-toggle');
      let logoDataUrl = null;

      // Theme Toggle
      themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        document.querySelector('.light-mode').classList.toggle('hidden');
        document.querySelector('.dark-mode').classList.toggle('hidden');
      });

      // Logo Upload
      logoUploadBtn.addEventListener('click', function() {
        logoUploadInput.click();
      });

      logoUploadInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          logoNameSpan.textContent = file.name;
          
          // Convert to data URL for storage and preview
          const reader = new FileReader();
          reader.onload = function(e) {
            logoDataUrl = e.target.result;
            updateInvoicePreview();
          };
          reader.readAsDataURL(file);
        }
      });

      // Add item button
      addItemBtn.addEventListener('click', function() {
        addNewItem();
        calculateTotals();
        updateInvoicePreview();
      });

      // Function to add a new line item
      function addNewItem(description = '', price = '', quantity = 1) {
        const tr = document.createElement('tr');
        tr.className = 'line-item border-t';
        tr.innerHTML = \`
          <td class="p-2">
            <input type="text" class="item-description w-full px-2 py-1 border rounded" value="\${description}">
          </td>
          <td class="p-2">
            <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="\${price}" min="0" step="0.01">
          </td>
          <td class="p-2">
            <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="\${quantity}" min="1" step="1">
          </td>
          <td class="p-2">
            <span class="item-total block text-right font-medium">$0.00</span>
          </td>
          <td class="p-2 text-center">
            <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        \`;
        lineItemsContainer.appendChild(tr);
        
        // Add event listeners to inputs and remove button
        const inputs = tr.querySelectorAll('input');
        inputs.forEach(input => {
          input.addEventListener('input', function() {
            calculateItemTotal(tr);
            calculateTotals();
            updateInvoicePreview();
          });
        });
        
        const removeBtn = tr.querySelector('.remove-item');
        removeBtn.addEventListener('click', function() {
          tr.remove();
          calculateTotals();
          updateInvoicePreview();
        });
        
        return tr;
      }

      // Calculate a single item's total
      function calculateItemTotal(itemRow) {
        const price = parseFloat(itemRow.querySelector('.item-price').value) || 0;
        const quantity = parseInt(itemRow.querySelector('.item-quantity').value) || 0;
        const total = price * quantity;
        itemRow.querySelector('.item-total').textContent = \`$\${total.toFixed(2)}\`;
        return total;
      }

      // Calculate all totals
      function calculateTotals() {
        let subtotal = 0;
        const items = document.querySelectorAll('.line-item');
        
        items.forEach(item => {
          subtotal += calculateItemTotal(item);
        });
        
        const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
        const discountRate = parseFloat(document.getElementById('discount-rate').value) || 0;
        
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;
        
        document.getElementById('subtotal').textContent = \`$\${subtotal.toFixed(2)}\`;
        document.getElementById('tax-amount').textContent = \`$\${taxAmount.toFixed(2)}\`;
        document.getElementById('discount-amount').textContent = \`$\${discountAmount.toFixed(2)}\`;
        document.getElementById('total-amount').textContent = \`$\${total.toFixed(2)}\`;
        
        // Update the tax and discount labels
        document.querySelector('#tax-container span:first-child').textContent = \`Tax (\${taxRate}%):\`;
        document.querySelector('#discount-container span:first-child').textContent = \`Discount (\${discountRate}%):\`;
      }

      // Update the invoice preview
      function updateInvoicePreview() {
        const previewContainer = document.getElementById('invoice-preview');
        
        // Get all form data
        const sellerName = document.getElementById('seller-name').value;
        const sellerAddress = document.getElementById('seller-address').value;
        const sellerPhone = document.getElementById('seller-phone').value;
        const sellerEmail = document.getElementById('seller-email').value;
        
        const clientName = document.getElementById('client-name').value;
        const clientAddress = document.getElementById('client-address').value;
        const clientPhone = document.getElementById('client-phone').value;
        const clientEmail = document.getElementById('client-email').value;
        
        const invoiceNumber = document.getElementById('invoice-number').value;
        const invoiceDate = formatDate(document.getElementById('invoice-date').value);
        const invoiceDueDate = formatDate(document.getElementById('invoice-due-date').value);
        
        const taxRate = document.getElementById('tax-rate').value;
        const discountRate = document.getElementById('discount-rate').value;
        
        const terms = document.getElementById('terms').value;
        
        const subtotal = document.getElementById('subtotal').textContent;
        const taxAmount = document.getElementById('tax-amount').textContent;
        const discountAmount = document.getElementById('discount-amount').textContent;
        const totalAmount = document.getElementById('total-amount').textContent;
        
        // Generate item rows HTML
        let itemsHtml = '';
        const items = document.querySelectorAll('.line-item');
        let itemNumber = 1;
        
        items.forEach(item => {
          const description = item.querySelector('.item-description').value;
          const price = item.querySelector('.item-price').value;
          const quantity = item.querySelector('.item-quantity').value;
          const total = item.querySelector('.item-total').textContent;
          
          itemsHtml += \`
            <tr class="border-b">
              <td class="py-2 text-center">\${itemNumber}</td>
              <td class="py-2">\${description}</td>
              <td class="py-2 text-right">\${price}</td>
              <td class="py-2 text-center">\${quantity}</td>
              <td class="py-2 text-right">\${total}</td>
            </tr>
          \`;
          itemNumber++;
        });
        
        // Create the full invoice HTML
        const invoiceHtml = \`
          <div id="invoice-for-print" class="invoice-template bg-white">
            <div class="invoice-header bg-teal-500">
              <div>
                \${logoDataUrl ? \`<img src="\${logoDataUrl}" alt="Company Logo" class="company-logo">\` : ''}
                <h1 class="text-3xl font-bold mt-2">INVOICE</h1>
              </div>
            </div>
            
            <div class="invoice-body">
              <div class="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 class="text-lg font-semibold mb-2">Invoice to:</h2>
                  <p class="font-semibold">\${clientName}</p>
                  <p class="whitespace-pre-line">\${clientAddress}</p>
                  \${clientPhone ? \`<p>\${clientPhone}</p>\` : ''}
                  \${clientEmail ? \`<p>\${clientEmail}</p>\` : ''}
                </div>
                <div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="font-semibold">Invoice#</div>
                    <div>\${invoiceNumber}</div>
                    <div class="font-semibold">Date:</div>
                    <div>\${invoiceDate}</div>
                    <div class="font-semibold">Due Date:</div>
                    <div>\${invoiceDueDate}</div>
                  </div>
                </div>
              </div>
              
              <table class="w-full mb-8">
                <thead>
                  <tr class="bg-gray-100 border-b border-t">
                    <th class="py-2 text-center">SL.</th>
                    <th class="py-2 text-left">Item Description</th>
                    <th class="py-2 text-right">Price</th>
                    <th class="py-2 text-center">Qty.</th>
                    <th class="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  \${itemsHtml}
                </tbody>
              </table>
              
              <div class="flex justify-between">
                <div class="w-1/2">
                  <h3 class="font-semibold mb-2">Thank you for your business</h3>
                  
                  <div class="mt-4">
                    <h3 class="font-semibold mb-2">Payment Info:</h3>
                    <p>Account #: 1234 5678 9012</p>
                    <p>A/C Name: \${sellerName}</p>
                    <p>Bank Details: Add your bank details</p>
                  </div>
                  
                  <div class="mt-4">
                    <h3 class="font-semibold mb-2">Terms & Conditions</h3>
                    <p class="text-sm">\${terms}</p>
                  </div>
                </div>
                
                <div class="w-1/3">
                  <div class="bg-gray-100 p-4">
                    <div class="flex justify-between mb-2">
                      <span>Sub Total:</span>
                      <span>\${subtotal}</span>
                    </div>
                    
                    <div class="flex justify-between mb-2">
                      <span>Tax (\${taxRate}%):</span>
                      <span>\${taxAmount}</span>
                    </div>
                    
                    <div class="flex justify-between mb-2">
                      <span>Discount (\${discountRate}%):</span>
                      <span>\${discountAmount}</span>
                    </div>
                    
                    <div class="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span>\${totalAmount}</span>
                    </div>
                  </div>
                  
                  <div class="mt-16 text-center">
                    <div class="border-t pt-2">Authorized Sign</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="invoice-footer mt-8 text-center text-sm text-gray-500">
              <p>\${sellerName} | \${sellerAddress} | \${sellerPhone} | \${sellerEmail}</p>
            </div>
          </div>
        \`;
        
        previewContainer.innerHTML = invoiceHtml;
      }

      // Helper function to format date
      function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }

      // Save invoice to localStorage
      saveInvoiceBtn.addEventListener('click', function() {
        const invoiceData = getFormData();
        
        try {
          // Prompt user for a name for this invoice
          const invoiceName = prompt('Enter a name for this invoice:', 'Invoice-' + invoiceData.invoiceNumber);
          if (!invoiceName) return; // User cancelled
          
          // Get existing saved invoices
          const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '{}');
          
          // Add the new invoice
          savedInvoices[invoiceName] = invoiceData;
          
          // Save back to localStorage
          localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
          
          alert(\`Invoice "\${invoiceName}" saved successfully!\`);
        } catch (error) {
          console.error('Error saving invoice:', error);
          alert('Error saving invoice. Please try again.');
        }
      });

      // Load invoice from localStorage
      loadInvoiceBtn.addEventListener('click', function() {
        try {
          // Get saved invoices
          const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '{}');
          const invoiceNames = Object.keys(savedInvoices);
          
          if (invoiceNames.length === 0) {
            alert('No saved invoices found.');
            return;
          }
          
          // Create a simple selection dialog
          const selection = prompt(
            'Select an invoice to load:\\n' + 
            invoiceNames.map((name, i) => \`\${i + 1}. \${name}\`).join('\\n') + 
            '\\n\\nEnter the number or name of the invoice:'
          );
          
          if (!selection) return; // User cancelled
          
          // Determine which invoice to load
          let invoiceName;
          if (!isNaN(selection) && parseInt(selection) <= invoiceNames.length) {
            // User entered a number
            invoiceName = invoiceNames[parseInt(selection) - 1];
          } else if (invoiceNames.includes(selection)) {
            // User entered a name
            invoiceName = selection;
          } else {
            alert('Invalid selection.');
            return;
          }
          
          // Load the invoice data
          const invoiceData = savedInvoices[invoiceName];
          loadFormData(invoiceData);
          
          alert(\`Invoice "\${invoiceName}" loaded successfully!\`);
        } catch (error) {
          console.error('Error loading invoice:', error);
          alert('Error loading invoice. Please try again.');
        }
      });

      // Export PDF
      exportPdfBtn.addEventListener('click', function() {
        // Get the invoice element
        const element = document.getElementById('invoice-for-print');
        
        if (!element) {
          alert('Please generate an invoice first.');
          return;
        }
        
        const invoiceNumber = document.getElementById('invoice-number').value || 'Invoice';
        
        html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          
          const imgWidth = 210; // A4 width in mm
          const imgHeight = canvas.height * imgWidth / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save(\`\${invoiceNumber}.pdf\`);
        });
      });

      // Print Invoice
      printInvoiceBtn.addEventListener('click', function() {
        window.print();
      });

      // Reset form
      resetFormBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? This will clear all data.')) {
          document.querySelectorAll('#line-items tr').forEach(tr => tr.remove());
          
          // Add one empty item
          addNewItem();
          
          // Reset fields
          document.getElementById('tax-rate').value = '0.0';
          document.getElementById('discount-rate').value = '0.0';
          
          // Clear logo
          logoDataUrl = null;
          logoNameSpan.textContent = 'No file chosen';
          
          calculateTotals();
          updateInvoicePreview();
        }
      });

      // Helper function to get all form data
      function getFormData() {
        const itemsData = [];
        document.querySelectorAll('.line-item').forEach(item => {
          itemsData.push({
            description: item.querySelector('.item-description').value,
            price: item.querySelector('.item-price').value,
            quantity: item.querySelector('.item-quantity').value
          });
        });
        
        return {
          sellerName: document.getElementById('seller-name').value,
          sellerAddress: document.getElementById('seller-address').value,
          sellerPhone: document.getElementById('seller-phone').value,
          sellerEmail: document.getElementById('seller-email').value,
          
          clientName: document.getElementById('client-name').value,
          clientAddress: document.getElementById('client-address').value,
          clientPhone: document.getElementById('client-phone').value,
          clientEmail: document.getElementById('client-email').value,
          
          invoiceNumber: document.getElementById('invoice-number').value,
          invoiceDate: document.getElementById('invoice-date').value,
          invoiceDueDate: document.getElementById('invoice-due-date').value,
          
          taxRate: document.getElementById('tax-rate').value,
          discountRate: document.getElementById('discount-rate').value,
          
          terms: document.getElementById('terms').value,
          
          items: itemsData,
          
          logoDataUrl: logoDataUrl
        };
      }

      // Helper function to load data into the form
      function loadFormData(data) {
        if (!data) return;
        
        // Set form fields
        document.getElementById('seller-name').value = data.sellerName || '';
        document.getElementById('seller-address').value = data.sellerAddress || '';
        document.getElementById('seller-phone').value = data.sellerPhone || '';
        document.getElementById('seller-email').value = data.sellerEmail || '';
        
        document.getElementById('client-name').value = data.clientName || '';
        document.getElementById('client-address').value = data.clientAddress || '';
        document.getElementById('client-phone').value = data.clientPhone || '';
        document.getElementById('client-email').value = data.clientEmail || '';
        
        document.getElementById('invoice-number').value = data.invoiceNumber || '';
        document.getElementById('invoice-date').value = data.invoiceDate || '';
        document.getElementById('invoice-due-date').value = data.invoiceDueDate || '';
        
        document.getElementById('tax-rate').value = data.taxRate || '0.0';
        document.getElementById('discount-rate').value = data.discountRate || '0.0';
        
        document.getElementById('terms').value = data.terms || '';
        
        // Clear existing items
        document.querySelectorAll('#line-items tr').forEach(tr => tr.remove());
        
        // Add saved items
        if (data.items && data.items.length > 0) {
          data.items.forEach(item => {
            addNewItem(item.description, item.price, item.quantity);
          });
        } else {
          // Add one empty item if no items
          addNewItem();
        }
        
        // Set logo if exists
        if (data.logoDataUrl) {
          logoDataUrl = data.logoDataUrl;
          logoNameSpan.textContent = 'Logo loaded';
        }
        
        // Calculate and update preview
        calculateTotals();
        updateInvoicePreview();
      }

      // Initialize event listeners for existing items
      document.querySelectorAll('.line-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        inputs.forEach(input => {
          input.addEventListener('input', function() {
            calculateItemTotal(item);
            calculateTotals();
            updateInvoicePreview();
          });
        });
        
        const removeBtn = item.querySelector('.remove-item');
        removeBtn.addEventListener('click', function() {
          item.remove();
          calculateTotals();
          updateInvoicePreview();
        });
        
        calculateItemTotal(item);
      });

      // Initialize tax and discount inputs
      document.getElementById('tax-rate').addEventListener('input', function() {
        calculateTotals();
        updateInvoicePreview();
      });
      
      document.getElementById('discount-rate').addEventListener('input', function() {
        calculateTotals();
        updateInvoicePreview();
      });

      // Attach listeners to all form fields for live preview updates
      document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', updateInvoicePreview);
      });

      // Initial calculations and preview
      calculateTotals();
      updateInvoicePreview();
    });
  <\/script> `], [" ", `<div class="relative min-h-screen bg-gray-100 py-6 px-4"> <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"> <div class="p-5 bg-teal-500 text-white flex justify-between items-center"> <h1 class="text-2xl font-semibold">Invoice Generator</h1> <button id="theme-toggle" class="px-4 py-2 bg-white text-teal-500 rounded hover:bg-teal-50 transition-colors"> <span class="light-mode">Dark Mode</span> <span class="dark-mode hidden">Light Mode</span> </button> </div> <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6"> <!-- Left column: Form inputs --> <div class="space-y-6"> <!-- Seller Details --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Seller Information</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label> <input type="text" id="seller-name" class="w-full px-3 py-2 border rounded-md" placeholder="Your Company Name" value="Brand Name"> </div> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Address</label> <textarea id="seller-address" class="w-full px-3 py-2 border rounded-md" rows="2" placeholder="Company Address">123 Business Street, City, Country</textarea> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label> <input type="text" id="seller-phone" class="w-full px-3 py-2 border rounded-md" placeholder="Phone Number" value="+1 234 567 890"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" id="seller-email" class="w-full px-3 py-2 border rounded-md" placeholder="Email Address" value="info@brandname.com"> </div> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Logo</label> <div class="flex items-center space-x-3"> <input type="file" id="logo-upload" accept="image/*" class="hidden"> <button id="logo-upload-btn" class="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">Upload Logo</button> <span id="logo-name" class="text-sm text-gray-500">No file chosen</span> </div> </div> </div> </div> <!-- Buyer Details --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Client Information</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Client Name</label> <input type="text" id="client-name" class="w-full px-3 py-2 border rounded-md" placeholder="Client Name" value="Dwyane Clark"> </div> <div class="col-span-2"> <label class="block text-sm font-medium text-gray-700 mb-1">Address</label> <textarea id="client-address" class="w-full px-3 py-2 border rounded-md" rows="2" placeholder="Client Address">24 Dummy Street Area, Location, Lorem Ipsum, 57800538</textarea> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label> <input type="text" id="client-phone" class="w-full px-3 py-2 border rounded-md" placeholder="Phone Number"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" id="client-email" class="w-full px-3 py-2 border rounded-md" placeholder="Email Address"> </div> </div> </div> <!-- Invoice Details --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Invoice Details</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label> <input type="text" id="invoice-number" class="w-full px-3 py-2 border rounded-md" placeholder="#001" value="52148"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Date</label> <input type="date" id="invoice-date" class="w-full px-3 py-2 border rounded-md" value="2020-02-01"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label> <input type="date" id="invoice-due-date" class="w-full px-3 py-2 border rounded-md" value="2020-02-15"> </div> </div> </div> <!-- Tax and Discount --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Tax & Discount</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label> <input type="number" id="tax-rate" class="w-full px-3 py-2 border rounded-md" placeholder="0.0" value="0.0" min="0" max="100" step="0.1"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label> <input type="number" id="discount-rate" class="w-full px-3 py-2 border rounded-md" placeholder="0.0" value="0.0" min="0" max="100" step="0.1"> </div> </div> </div> <!-- Terms & Notes --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Terms & Notes</h2> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label> <textarea id="terms" class="w-full px-3 py-2 border rounded-md" rows="3" placeholder="Terms and conditions...">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce adipiscing pretium consectetur. Curabitur tempor posuere massa in varius. Pellentesque viverra nisi eu velit mattis, nullam porta.</textarea> </div> </div> <!-- Actions --> <div class="flex flex-wrap gap-3"> <button id="save-invoice" class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"> <i class="fas fa-save mr-2"></i>Save
</button> <button id="load-invoice" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"> <i class="fas fa-folder-open mr-2"></i>Load
</button> <button id="export-pdf" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-file-pdf mr-2"></i>Export PDF
</button> <button id="print-invoice" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"> <i class="fas fa-print mr-2"></i>Print
</button> <button id="reset-form" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"> <i class="fas fa-redo mr-2"></i>Reset
</button> </div> </div> <!-- Right column: Items & Preview --> <div class="space-y-6"> <!-- Line Items --> <div class="border rounded-lg p-4 bg-white"> <div class="flex justify-between items-center mb-3"> <h2 class="text-lg font-semibold text-teal-600">Line Items</h2> <button id="add-item" class="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"> <i class="fas fa-plus mr-1"></i>Add Item
</button> </div> <div class="overflow-x-auto"> <table class="min-w-full border-collapse" id="items-table"> <thead class="bg-gray-50"> <tr> <th class="p-2 text-left text-sm font-medium text-gray-500">Item</th> <th class="p-2 text-right text-sm font-medium text-gray-500">Price</th> <th class="p-2 text-right text-sm font-medium text-gray-500">Qty</th> <th class="p-2 text-right text-sm font-medium text-gray-500">Total</th> <th class="p-2 text-center text-sm font-medium text-gray-500">Action</th> </tr> </thead> <tbody id="line-items"> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Lorem ipsum Dolor"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="50.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="1" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$50.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Pellentesque id neque ligula"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="20.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="3" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$60.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Interdum et malesuada fames"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="10.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="2" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$20.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> <tr class="line-item border-t"> <td class="p-2"> <input type="text" class="item-description w-full px-2 py-1 border rounded" value="Vivamus volutpat faucibus"> </td> <td class="p-2"> <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="90.00" min="0" step="0.01"> </td> <td class="p-2"> <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="1" min="1" step="1"> </td> <td class="p-2"> <span class="item-total block text-right font-medium">$90.00</span> </td> <td class="p-2 text-center"> <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"> <i class="fas fa-trash"></i> </button> </td> </tr> </tbody> </table> </div> <!-- Totals --> <div class="mt-4 border-t pt-4"> <div class="flex justify-between items-center py-1"> <span class="text-gray-600">Subtotal:</span> <span id="subtotal" class="font-medium">$220.00</span> </div> <div class="flex justify-between items-center py-1" id="tax-container"> <span class="text-gray-600">Tax (0%):</span> <span id="tax-amount" class="font-medium">$0.00</span> </div> <div class="flex justify-between items-center py-1" id="discount-container"> <span class="text-gray-600">Discount (0%):</span> <span id="discount-amount" class="font-medium">$0.00</span> </div> <div class="flex justify-between items-center py-2 text-lg font-bold border-t mt-2"> <span>Total:</span> <span id="total-amount">$220.00</span> </div> </div> </div> <!-- Invoice Preview --> <div class="border rounded-lg p-4 bg-white"> <h2 class="text-lg font-semibold mb-3 text-teal-600">Invoice Preview</h2> <div id="invoice-preview" class="border rounded p-4 bg-gray-50"> <div class="print-only"> <!-- This will be populated with the invoice HTML for printing --> </div> </div> </div> </div> </div> </div> </div>  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script> <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>    <script>
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Elements
      const addItemBtn = document.getElementById('add-item');
      const lineItemsContainer = document.getElementById('line-items');
      const saveInvoiceBtn = document.getElementById('save-invoice');
      const loadInvoiceBtn = document.getElementById('load-invoice');
      const exportPdfBtn = document.getElementById('export-pdf');
      const printInvoiceBtn = document.getElementById('print-invoice');
      const resetFormBtn = document.getElementById('reset-form');
      const logoUploadBtn = document.getElementById('logo-upload-btn');
      const logoUploadInput = document.getElementById('logo-upload');
      const logoNameSpan = document.getElementById('logo-name');
      const themeToggleBtn = document.getElementById('theme-toggle');
      let logoDataUrl = null;

      // Theme Toggle
      themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        document.querySelector('.light-mode').classList.toggle('hidden');
        document.querySelector('.dark-mode').classList.toggle('hidden');
      });

      // Logo Upload
      logoUploadBtn.addEventListener('click', function() {
        logoUploadInput.click();
      });

      logoUploadInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          logoNameSpan.textContent = file.name;
          
          // Convert to data URL for storage and preview
          const reader = new FileReader();
          reader.onload = function(e) {
            logoDataUrl = e.target.result;
            updateInvoicePreview();
          };
          reader.readAsDataURL(file);
        }
      });

      // Add item button
      addItemBtn.addEventListener('click', function() {
        addNewItem();
        calculateTotals();
        updateInvoicePreview();
      });

      // Function to add a new line item
      function addNewItem(description = '', price = '', quantity = 1) {
        const tr = document.createElement('tr');
        tr.className = 'line-item border-t';
        tr.innerHTML = \\\`
          <td class="p-2">
            <input type="text" class="item-description w-full px-2 py-1 border rounded" value="\\\${description}">
          </td>
          <td class="p-2">
            <input type="number" class="item-price w-full px-2 py-1 border rounded text-right" value="\\\${price}" min="0" step="0.01">
          </td>
          <td class="p-2">
            <input type="number" class="item-quantity w-full px-2 py-1 border rounded text-right" value="\\\${quantity}" min="1" step="1">
          </td>
          <td class="p-2">
            <span class="item-total block text-right font-medium">$0.00</span>
          </td>
          <td class="p-2 text-center">
            <button class="remove-item px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        \\\`;
        lineItemsContainer.appendChild(tr);
        
        // Add event listeners to inputs and remove button
        const inputs = tr.querySelectorAll('input');
        inputs.forEach(input => {
          input.addEventListener('input', function() {
            calculateItemTotal(tr);
            calculateTotals();
            updateInvoicePreview();
          });
        });
        
        const removeBtn = tr.querySelector('.remove-item');
        removeBtn.addEventListener('click', function() {
          tr.remove();
          calculateTotals();
          updateInvoicePreview();
        });
        
        return tr;
      }

      // Calculate a single item's total
      function calculateItemTotal(itemRow) {
        const price = parseFloat(itemRow.querySelector('.item-price').value) || 0;
        const quantity = parseInt(itemRow.querySelector('.item-quantity').value) || 0;
        const total = price * quantity;
        itemRow.querySelector('.item-total').textContent = \\\`$\\\${total.toFixed(2)}\\\`;
        return total;
      }

      // Calculate all totals
      function calculateTotals() {
        let subtotal = 0;
        const items = document.querySelectorAll('.line-item');
        
        items.forEach(item => {
          subtotal += calculateItemTotal(item);
        });
        
        const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
        const discountRate = parseFloat(document.getElementById('discount-rate').value) || 0;
        
        const taxAmount = subtotal * (taxRate / 100);
        const discountAmount = subtotal * (discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;
        
        document.getElementById('subtotal').textContent = \\\`$\\\${subtotal.toFixed(2)}\\\`;
        document.getElementById('tax-amount').textContent = \\\`$\\\${taxAmount.toFixed(2)}\\\`;
        document.getElementById('discount-amount').textContent = \\\`$\\\${discountAmount.toFixed(2)}\\\`;
        document.getElementById('total-amount').textContent = \\\`$\\\${total.toFixed(2)}\\\`;
        
        // Update the tax and discount labels
        document.querySelector('#tax-container span:first-child').textContent = \\\`Tax (\\\${taxRate}%):\\\`;
        document.querySelector('#discount-container span:first-child').textContent = \\\`Discount (\\\${discountRate}%):\\\`;
      }

      // Update the invoice preview
      function updateInvoicePreview() {
        const previewContainer = document.getElementById('invoice-preview');
        
        // Get all form data
        const sellerName = document.getElementById('seller-name').value;
        const sellerAddress = document.getElementById('seller-address').value;
        const sellerPhone = document.getElementById('seller-phone').value;
        const sellerEmail = document.getElementById('seller-email').value;
        
        const clientName = document.getElementById('client-name').value;
        const clientAddress = document.getElementById('client-address').value;
        const clientPhone = document.getElementById('client-phone').value;
        const clientEmail = document.getElementById('client-email').value;
        
        const invoiceNumber = document.getElementById('invoice-number').value;
        const invoiceDate = formatDate(document.getElementById('invoice-date').value);
        const invoiceDueDate = formatDate(document.getElementById('invoice-due-date').value);
        
        const taxRate = document.getElementById('tax-rate').value;
        const discountRate = document.getElementById('discount-rate').value;
        
        const terms = document.getElementById('terms').value;
        
        const subtotal = document.getElementById('subtotal').textContent;
        const taxAmount = document.getElementById('tax-amount').textContent;
        const discountAmount = document.getElementById('discount-amount').textContent;
        const totalAmount = document.getElementById('total-amount').textContent;
        
        // Generate item rows HTML
        let itemsHtml = '';
        const items = document.querySelectorAll('.line-item');
        let itemNumber = 1;
        
        items.forEach(item => {
          const description = item.querySelector('.item-description').value;
          const price = item.querySelector('.item-price').value;
          const quantity = item.querySelector('.item-quantity').value;
          const total = item.querySelector('.item-total').textContent;
          
          itemsHtml += \\\`
            <tr class="border-b">
              <td class="py-2 text-center">\\\${itemNumber}</td>
              <td class="py-2">\\\${description}</td>
              <td class="py-2 text-right">\\\${price}</td>
              <td class="py-2 text-center">\\\${quantity}</td>
              <td class="py-2 text-right">\\\${total}</td>
            </tr>
          \\\`;
          itemNumber++;
        });
        
        // Create the full invoice HTML
        const invoiceHtml = \\\`
          <div id="invoice-for-print" class="invoice-template bg-white">
            <div class="invoice-header bg-teal-500">
              <div>
                \\\${logoDataUrl ? \\\`<img src="\\\${logoDataUrl}" alt="Company Logo" class="company-logo">\\\` : ''}
                <h1 class="text-3xl font-bold mt-2">INVOICE</h1>
              </div>
            </div>
            
            <div class="invoice-body">
              <div class="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 class="text-lg font-semibold mb-2">Invoice to:</h2>
                  <p class="font-semibold">\\\${clientName}</p>
                  <p class="whitespace-pre-line">\\\${clientAddress}</p>
                  \\\${clientPhone ? \\\`<p>\\\${clientPhone}</p>\\\` : ''}
                  \\\${clientEmail ? \\\`<p>\\\${clientEmail}</p>\\\` : ''}
                </div>
                <div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="font-semibold">Invoice#</div>
                    <div>\\\${invoiceNumber}</div>
                    <div class="font-semibold">Date:</div>
                    <div>\\\${invoiceDate}</div>
                    <div class="font-semibold">Due Date:</div>
                    <div>\\\${invoiceDueDate}</div>
                  </div>
                </div>
              </div>
              
              <table class="w-full mb-8">
                <thead>
                  <tr class="bg-gray-100 border-b border-t">
                    <th class="py-2 text-center">SL.</th>
                    <th class="py-2 text-left">Item Description</th>
                    <th class="py-2 text-right">Price</th>
                    <th class="py-2 text-center">Qty.</th>
                    <th class="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  \\\${itemsHtml}
                </tbody>
              </table>
              
              <div class="flex justify-between">
                <div class="w-1/2">
                  <h3 class="font-semibold mb-2">Thank you for your business</h3>
                  
                  <div class="mt-4">
                    <h3 class="font-semibold mb-2">Payment Info:</h3>
                    <p>Account #: 1234 5678 9012</p>
                    <p>A/C Name: \\\${sellerName}</p>
                    <p>Bank Details: Add your bank details</p>
                  </div>
                  
                  <div class="mt-4">
                    <h3 class="font-semibold mb-2">Terms & Conditions</h3>
                    <p class="text-sm">\\\${terms}</p>
                  </div>
                </div>
                
                <div class="w-1/3">
                  <div class="bg-gray-100 p-4">
                    <div class="flex justify-between mb-2">
                      <span>Sub Total:</span>
                      <span>\\\${subtotal}</span>
                    </div>
                    
                    <div class="flex justify-between mb-2">
                      <span>Tax (\\\${taxRate}%):</span>
                      <span>\\\${taxAmount}</span>
                    </div>
                    
                    <div class="flex justify-between mb-2">
                      <span>Discount (\\\${discountRate}%):</span>
                      <span>\\\${discountAmount}</span>
                    </div>
                    
                    <div class="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span>\\\${totalAmount}</span>
                    </div>
                  </div>
                  
                  <div class="mt-16 text-center">
                    <div class="border-t pt-2">Authorized Sign</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="invoice-footer mt-8 text-center text-sm text-gray-500">
              <p>\\\${sellerName} | \\\${sellerAddress} | \\\${sellerPhone} | \\\${sellerEmail}</p>
            </div>
          </div>
        \\\`;
        
        previewContainer.innerHTML = invoiceHtml;
      }

      // Helper function to format date
      function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }

      // Save invoice to localStorage
      saveInvoiceBtn.addEventListener('click', function() {
        const invoiceData = getFormData();
        
        try {
          // Prompt user for a name for this invoice
          const invoiceName = prompt('Enter a name for this invoice:', 'Invoice-' + invoiceData.invoiceNumber);
          if (!invoiceName) return; // User cancelled
          
          // Get existing saved invoices
          const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '{}');
          
          // Add the new invoice
          savedInvoices[invoiceName] = invoiceData;
          
          // Save back to localStorage
          localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
          
          alert(\\\`Invoice "\\\${invoiceName}" saved successfully!\\\`);
        } catch (error) {
          console.error('Error saving invoice:', error);
          alert('Error saving invoice. Please try again.');
        }
      });

      // Load invoice from localStorage
      loadInvoiceBtn.addEventListener('click', function() {
        try {
          // Get saved invoices
          const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '{}');
          const invoiceNames = Object.keys(savedInvoices);
          
          if (invoiceNames.length === 0) {
            alert('No saved invoices found.');
            return;
          }
          
          // Create a simple selection dialog
          const selection = prompt(
            'Select an invoice to load:\\\\n' + 
            invoiceNames.map((name, i) => \\\`\\\${i + 1}. \\\${name}\\\`).join('\\\\n') + 
            '\\\\n\\\\nEnter the number or name of the invoice:'
          );
          
          if (!selection) return; // User cancelled
          
          // Determine which invoice to load
          let invoiceName;
          if (!isNaN(selection) && parseInt(selection) <= invoiceNames.length) {
            // User entered a number
            invoiceName = invoiceNames[parseInt(selection) - 1];
          } else if (invoiceNames.includes(selection)) {
            // User entered a name
            invoiceName = selection;
          } else {
            alert('Invalid selection.');
            return;
          }
          
          // Load the invoice data
          const invoiceData = savedInvoices[invoiceName];
          loadFormData(invoiceData);
          
          alert(\\\`Invoice "\\\${invoiceName}" loaded successfully!\\\`);
        } catch (error) {
          console.error('Error loading invoice:', error);
          alert('Error loading invoice. Please try again.');
        }
      });

      // Export PDF
      exportPdfBtn.addEventListener('click', function() {
        // Get the invoice element
        const element = document.getElementById('invoice-for-print');
        
        if (!element) {
          alert('Please generate an invoice first.');
          return;
        }
        
        const invoiceNumber = document.getElementById('invoice-number').value || 'Invoice';
        
        html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          
          const imgWidth = 210; // A4 width in mm
          const imgHeight = canvas.height * imgWidth / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save(\\\`\\\${invoiceNumber}.pdf\\\`);
        });
      });

      // Print Invoice
      printInvoiceBtn.addEventListener('click', function() {
        window.print();
      });

      // Reset form
      resetFormBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? This will clear all data.')) {
          document.querySelectorAll('#line-items tr').forEach(tr => tr.remove());
          
          // Add one empty item
          addNewItem();
          
          // Reset fields
          document.getElementById('tax-rate').value = '0.0';
          document.getElementById('discount-rate').value = '0.0';
          
          // Clear logo
          logoDataUrl = null;
          logoNameSpan.textContent = 'No file chosen';
          
          calculateTotals();
          updateInvoicePreview();
        }
      });

      // Helper function to get all form data
      function getFormData() {
        const itemsData = [];
        document.querySelectorAll('.line-item').forEach(item => {
          itemsData.push({
            description: item.querySelector('.item-description').value,
            price: item.querySelector('.item-price').value,
            quantity: item.querySelector('.item-quantity').value
          });
        });
        
        return {
          sellerName: document.getElementById('seller-name').value,
          sellerAddress: document.getElementById('seller-address').value,
          sellerPhone: document.getElementById('seller-phone').value,
          sellerEmail: document.getElementById('seller-email').value,
          
          clientName: document.getElementById('client-name').value,
          clientAddress: document.getElementById('client-address').value,
          clientPhone: document.getElementById('client-phone').value,
          clientEmail: document.getElementById('client-email').value,
          
          invoiceNumber: document.getElementById('invoice-number').value,
          invoiceDate: document.getElementById('invoice-date').value,
          invoiceDueDate: document.getElementById('invoice-due-date').value,
          
          taxRate: document.getElementById('tax-rate').value,
          discountRate: document.getElementById('discount-rate').value,
          
          terms: document.getElementById('terms').value,
          
          items: itemsData,
          
          logoDataUrl: logoDataUrl
        };
      }

      // Helper function to load data into the form
      function loadFormData(data) {
        if (!data) return;
        
        // Set form fields
        document.getElementById('seller-name').value = data.sellerName || '';
        document.getElementById('seller-address').value = data.sellerAddress || '';
        document.getElementById('seller-phone').value = data.sellerPhone || '';
        document.getElementById('seller-email').value = data.sellerEmail || '';
        
        document.getElementById('client-name').value = data.clientName || '';
        document.getElementById('client-address').value = data.clientAddress || '';
        document.getElementById('client-phone').value = data.clientPhone || '';
        document.getElementById('client-email').value = data.clientEmail || '';
        
        document.getElementById('invoice-number').value = data.invoiceNumber || '';
        document.getElementById('invoice-date').value = data.invoiceDate || '';
        document.getElementById('invoice-due-date').value = data.invoiceDueDate || '';
        
        document.getElementById('tax-rate').value = data.taxRate || '0.0';
        document.getElementById('discount-rate').value = data.discountRate || '0.0';
        
        document.getElementById('terms').value = data.terms || '';
        
        // Clear existing items
        document.querySelectorAll('#line-items tr').forEach(tr => tr.remove());
        
        // Add saved items
        if (data.items && data.items.length > 0) {
          data.items.forEach(item => {
            addNewItem(item.description, item.price, item.quantity);
          });
        } else {
          // Add one empty item if no items
          addNewItem();
        }
        
        // Set logo if exists
        if (data.logoDataUrl) {
          logoDataUrl = data.logoDataUrl;
          logoNameSpan.textContent = 'Logo loaded';
        }
        
        // Calculate and update preview
        calculateTotals();
        updateInvoicePreview();
      }

      // Initialize event listeners for existing items
      document.querySelectorAll('.line-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        inputs.forEach(input => {
          input.addEventListener('input', function() {
            calculateItemTotal(item);
            calculateTotals();
            updateInvoicePreview();
          });
        });
        
        const removeBtn = item.querySelector('.remove-item');
        removeBtn.addEventListener('click', function() {
          item.remove();
          calculateTotals();
          updateInvoicePreview();
        });
        
        calculateItemTotal(item);
      });

      // Initialize tax and discount inputs
      document.getElementById('tax-rate').addEventListener('input', function() {
        calculateTotals();
        updateInvoicePreview();
      });
      
      document.getElementById('discount-rate').addEventListener('input', function() {
        calculateTotals();
        updateInvoicePreview();
      });

      // Attach listeners to all form fields for live preview updates
      document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', updateInvoicePreview);
      });

      // Initial calculations and preview
      calculateTotals();
      updateInvoicePreview();
    });
  <\/script> `])), maybeRenderHead()) })}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250322-invoicegenerator.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250322-invoicegenerator.astro";
const $$url = "/sketches/2025/250322-invoicegenerator";

const __vite_glob_0_11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250322Invoicegenerator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_11 as _ };
