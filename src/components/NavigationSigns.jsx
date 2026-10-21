function NavigationSigns() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'Hackfusion', href: '#' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="hanging-navbar">
      <ul className="sign-list">
        {navItems.map((item) => (
          <li key={item.label} className="sign-item">
            <a href={item.href} className="hanging-sign">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationSigns;
