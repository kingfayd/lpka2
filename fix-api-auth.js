const fs = require('fs');
const path = require('path');

const files = [
  'app/api/layanan/[id]/route.ts',
  'app/api/layanan/route.ts',
  'app/api/content/sambutan/route.ts',
  'app/api/content/profil/route.ts',
  'app/api/content/layanan/route.ts'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove getTokenFromRequest declaration if it exists
    content = content.replace(/function getTokenFromRequest[\s\S]*?\}[\r\n]*/g, '');

    // Remove token check block (variant 1)
    content = content.replace(/[\s]*const token = getTokenFromRequest\(request\);[\s]*if \(!token \|\| !verifyToken\(token\)\) \{[\s]*return NextResponse\.json\(\{ error: 'Tidak terautentikasi' \}, \{ status: 401 \}\);[\s]*\}/g, '');
    
    // Remove token check block (variant 2 - cookieToken)
    content = content.replace(/[\s]*const token = request\.cookies\.get\('adminToken'\)\?\.value;?[\s]*if \(!token \|\| !verifyToken\(token\)\) \{[\s]*return NextResponse\.json\(\{ error: 'Tidak terautentikasi' \}, \{ status: 401 \}\);[\s]*\}/g, '');
    content = content.replace(/[\s]*const cookieToken = request\.cookies\.get\('adminToken'\)\?\.value;?[\s]*if \(!cookieToken \|\| !verifyToken\(cookieToken\)\) \{[\s]*return NextResponse\.json\(\{ error: 'Tidak terautentikasi' \}, \{ status: 401 \}\);[\s]*\}/g, '');

    // Remove token check block (variant 3 - specific to [id]/route.ts which might have variations)
    content = content.replace(/[\s]*const cookieToken = request\.headers\.get\('authorization'\)\?\.split\(' '\)\[1\] \|\| request\.cookies\.get\('adminToken'\)\?\.value;?[\s]*if \(!cookieToken \|\| !verifyToken\(cookieToken\)\) \{[\s]*return NextResponse\.json\(\{ error: 'Tidak terautentikasi' \}, \{ status: 401 \}\);[\s]*\}/g, '');

    // Fix profiling API which had slightly different spacing
    content = content.replace(/[\s]*const cookieToken = request\.cookies\.get\('adminToken'\)\?\.value[\s]*if \(!cookieToken \|\| !verifyToken\(cookieToken\)\) \{[\s]*return NextResponse\.json\(\{ error: 'Tidak terautentikasi' \}, \{ status: 401 \}\);[\s]*\}/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
