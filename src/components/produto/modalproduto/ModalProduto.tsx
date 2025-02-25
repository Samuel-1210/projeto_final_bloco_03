import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalProduto.css";
import FormProduto from "../formproduto/FormProduto";

function ModalProduto() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:text-white hover:bg-red-900">
            Novo Remédio
          </button>
        }
        modal
      >
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;
