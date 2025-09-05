// src/Layouts/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white text-center py-3">
      <p className="text-sm">
        Copyright {new Date().getFullYear()} | All Rights Reserved
      </p>
    </footer>
  );
}