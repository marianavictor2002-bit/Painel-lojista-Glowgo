import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const lojaId = "1ILLSY";

    const q = query(
      collection(db, "pedidos"),
      where("lojaId", "==", lojaId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPedidos(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Pedidos</h2>

      {pedidos.length === 0 && <p>Nenhum pedido ainda...</p>}

      {pedidos.map((p) => (
        <div key={p.id}>
          <p>Cliente: {p.clienteNome}</p>
          <p>Status: {p.status}</p>
          <p>Total: {p.total}</p>
        </div>
      ))}
    </div>
  );
}

