import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from 'miragejs'
import ReactModal from "react-modal";
import { useState } from "react";
import NewTransactionModal from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";


createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer',
          type: 'deposit',
          category: 'Dev',
          amount: 50000,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Home',
          amount: 870,
          createdAt: new Date(),
        },
      ],
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactModal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onClose={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
