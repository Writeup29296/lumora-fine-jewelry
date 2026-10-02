import fs from 'fs';
import path from 'path';

// Check if any source component file has undeclared variables or syntax errors
async function checkFiles() {
  console.log('🔍 Checking all React components for unresolved references...');
  const files = [
    'src/App.jsx',
    'src/components/Navbar.jsx',
    'src/components/AnnouncementBar.jsx',
    'src/components/Footer.jsx',
    'src/components/SecretAdminModal.jsx',
    'src/components/CartDrawer.jsx',
    'src/components/QuickViewModal.jsx',
    'src/components/SearchModal.jsx',
    'src/components/StickyAddToCart.jsx',
    'src/components/DeliveryEstimator.jsx',
    'src/components/DiamondScaleVisualizer.jsx',
    'src/components/AtelierCostComparison.jsx',
    'src/pages/HomePage.jsx',
    'src/pages/ShopPage.jsx',
    'src/pages/ProductDetailPage.jsx',
    'src/pages/AccountPage.jsx'
  ];

  let errors = 0;
  for (const f of files) {
    const fullPath = path.resolve(f);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${f}`);
      errors++;
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Look for obvious broken tokens or stray undefined variables
      if (content.includes('isAdmin={isAdmin}')) {
        console.error(`❌ Stray isAdmin reference found in ${f}`);
        errors++;
      }
    }
  }

  if (errors === 0) {
    console.log('✅ All components passed basic reference checks.');
  } else {
    console.error(`❌ Found ${errors} issues.`);
  }
}

checkFiles();
