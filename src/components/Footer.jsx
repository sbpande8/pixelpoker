export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '20px 16px', marginTop: 'auto', borderTop: '1px solid #1f1f3a' }}>
      <p style={{ fontSize: 8, fontFamily: "'Press Start 2P', cursive", color: '#374151', marginBottom: 10 }}>
        Created by Srijan Pandey (2026)
      </p>
      <p style={{ fontSize: 9, color: '#374151', lineHeight: 1.7, maxWidth: 640, margin: '0 auto', fontFamily: 'sans-serif' }}>
        PixelPoker is provided free of charge, as-is, with no warranties of any kind. By using this tool,
        you agree that the creator accepts no liability for any loss, damage, or disruption arising from its use.
        This tool does not collect, store, or process any personally identifiable information.
        Usernames and session data are temporary and used solely to facilitate planning sessions.
        Use of this service is entirely at your own risk.
      </p>
    </footer>
  )
}
