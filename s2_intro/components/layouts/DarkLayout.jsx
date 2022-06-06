export const DarkLayout = ({ children }) => {
  return (
    <div style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '5px',
        padding: '10px',
    }}>

        <h3>Dark layout</h3>

        <div>
            { children }
        </div>        
    </div>    
  )
}
