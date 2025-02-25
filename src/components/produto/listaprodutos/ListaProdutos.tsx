import { useEffect, useState } from "react";
import CardProdutos from "../cardproduto/CardProdutos";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../util/ToastAlerta";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function buscarProdutos() {
    try {
      await buscar("/produtos", setProdutos, {
        headers: {},
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("Nenhum produto encontrado", "erro");
      }
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
    <>
      {produtos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div
            className="grid grid-cols-1 md:grid-cols-3
                                    lg:grid-cols-5 gap-8"
          >
            {produtos.map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
