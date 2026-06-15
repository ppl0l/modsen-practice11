export const TimeColumn = () => {
  return (
    <div style={{ width: '60px', borderRight: '1px solid #ccc' }} aria-hidden="true">
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #eee',
            fontSize: '12px',
          }}
        >
          {i.toString().padStart(2, '0')}:00
        </div>
      ))}
    </div>
  );
};
