const styles = {
  container: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: 56,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '30vh',
    color: 'saddlebrown',
  },
};

export function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SUDOKU </h1>
    </div>
  );
}
