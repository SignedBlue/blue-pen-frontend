export const contractStyle = `
  body {
    width: 50%;
    margin: 0 auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    color: #333;
    margin-bottom: 40px;
    position: relative; /* Add this to establish a positioning context */
  }

  header .company_name {
    font-weight: bold;
    font-size: 25px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #000;
    color: transparent;
    letter-spacing: 3px;
  }

  header .date {
    font-size: 12px;
  }
  
  header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px; /* Adjust the height as needed */
    background-color: black; /* Set the color to black or any color you prefer */
  }

  .every_section {
    margin: 20px 0;
    border: 2px solid gray;
    min-height: 100vh;
    padding: 40px;
  }

  .every_section .title {
    font-size: 24px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
  }

  .every_section .subtitle {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .every_section p {
    margin-bottom: 20px;
  }

  .every_section ul {
    list-style-type: none;
    padding: 0;
    margin-left: 20px;
    margin-bottom: 20px;
  }

  .every_section ul li::before {
    content: "⦁";
    margin-right: 5px;
    color: #000;
  }

  table {
    width: 100%;
    border-collapse: collapse; /* Para remover espaçamento entre células */
    margin-bottom: 20px;
  }

  th {
    background-color: #f2f2f2;
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  tr:last-child {
    font-weight: bold;
  }
  
  .assinatura {
    margin-top: 100px;
    font-size: 14px;
    width: 300px;
  }

  .linha_assinatura {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
    margin-top: 50px;
  }

  .assinatura .linha {
    width: 300px;
    height: 2px;
    background-color: #333;
  }

  .linha_assinatura .names {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;  
  }
`;