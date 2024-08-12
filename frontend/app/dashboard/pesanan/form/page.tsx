"use client";
import { useState, FormEvent } from "react";
import { Select, Textfield } from "@/components/common";
import { AppBar } from "@/components/layouts";
import { GoTrash, GoPlus } from "react-icons/go";

interface IColor {
  color_id: number;
  qty: number;
}

interface IColorMethod {
  color_method_id: number;
  color: IColor[];
}

interface IStyle {
  style_id: number;
  color_method: IColorMethod[];
}

export interface IPayloadPesanan {
  id_customer: number;
  style: IStyle[];
}

export default function FormPage() {
  const [customer_id, setCustomer] = useState<number | null>(null);
  const [styles, setStyles] = useState<IStyle[]>([]);

  const handleAddStyle = () => {
    setStyles([...styles, { style_id: 0, color_method: [] }]);
  };

  const handleRemoveStyle = (index: number) => {
    setStyles(styles.filter((_, i) => i !== index));
  };

  const handleAddColorMethod = (styleIndex: number) => {
    const newStyles = [...styles];
    newStyles[styleIndex].color_method.push({ color_method_id: 0, color: [] });
    setStyles(newStyles);
  };

  const handleRemoveColorMethod = (styleIndex: number, methodIndex: number) => {
    const newStyles = [...styles];
    newStyles[styleIndex].color_method = newStyles[
      styleIndex
    ].color_method.filter((_, i) => i !== methodIndex);
    setStyles(newStyles);
  };

  const handleAddColor = (styleIndex: number, methodIndex: number) => {
    const newStyles = [...styles];
    newStyles[styleIndex].color_method[methodIndex].color.push({
      color_id: 0,
      qty: 1,
    });
    setStyles(newStyles);
  };

  const handleRemoveColor = (
    styleIndex: number,
    methodIndex: number,
    colorIndex: number
  ) => {
    const newStyles = [...styles];
    newStyles[styleIndex].color_method[methodIndex].color = newStyles[
      styleIndex
    ].color_method[methodIndex].color.filter((_, i) => i !== colorIndex);
    setStyles(newStyles);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      id_customer: customer_id,
      style: styles,
    };

    console.log(payload);
    // Lakukan pengiriman data payload ke API
  };

  return (
    <div className="space-y-7">
      <AppBar buttonBack title="Buat Pesanan" />

      <div className="space-y-5 w-full md:w-1/2">
        <Select
          urlDataApi={"/api/customers"}
          label={"Pelanggan"}
          placeholder="pilih..."
          value={customer_id}
          setValue={setCustomer}
          keyValue={{
            key: "id",
            value: "name",
          }}
        />
      </div>

      <p className="capitalize antialiased text-secondary-medium/70">
        Detail Barang
      </p>

      <button
        className="p-1.5 px-2.5 border border-primary-600 text-primary-600 rounded hover:shadow disabled:bg-primary-600/50 disabled:cursor-not-allowed"
        onClick={handleAddStyle}
      >
        Style Baru
      </button>

      <div>
        {styles.map((style, styleIndex) => (
          <div
            key={styleIndex}
            className="border rounded bg-white p-2 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-secondary-medium/80">Style {styleIndex + 1}</p>
              <GoTrash
                className="text-red-600 hover:bg-red-600 hover:text-white rounded-full p-1 text-2xl cursor-pointer"
                onClick={() => handleRemoveStyle(styleIndex)}
              />
            </div>

            <Select
              urlDataApi={"/api/products/style"}
              label={"Style"}
              placeholder="pilih..."
              value={style.style_id}
              setValue={(value: number) => {
                const newStyles = [...styles];
                newStyles[styleIndex].style_id = value;
                setStyles(newStyles);
              }}
              keyValue={{
                key: "id",
                value: "name",
              }}
            />

            <button
              className="p-1.5 px-2.5 border border-primary-600 text-primary-600 rounded hover:shadow disabled:bg-primary-600/50 disabled:cursor-not-allowed"
              onClick={() => handleAddColorMethod(styleIndex)}
            >
              Tambah Metode Pewarnaan
            </button>

            {style.color_method.map((method, methodIndex) => (
              <div
                key={methodIndex}
                className="border rounded bg-white p-2 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-secondary-medium/80">Color Method</p>
                  <GoTrash
                    className="text-red-600 hover:bg-red-600 hover:text-white rounded-full p-1 text-2xl cursor-pointer"
                    onClick={() =>
                      handleRemoveColorMethod(styleIndex, methodIndex)
                    }
                  />
                </div>

                <Select
                  urlDataApi={"/api/products/color-method"}
                  label={"Metode Pewarnaan"}
                  placeholder="pilih..."
                  value={method.color_method_id}
                  setValue={(value: number) => {
                    const newStyles = [...styles];
                    newStyles[styleIndex].color_method[
                      methodIndex
                    ].color_method_id = value;
                    setStyles(newStyles);
                  }}
                  keyValue={{
                    key: "id",
                    value: "name",
                  }}
                />

                <button
                  className="p-1.5 px-2.5 border border-primary-600 text-primary-600 rounded hover:shadow disabled:bg-primary-600/50 disabled:cursor-not-allowed"
                  onClick={() => handleAddColor(styleIndex, methodIndex)}
                >
                  Tambah Warna
                </button>

                {method.color.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="border rounded bg-white p-2 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-secondary-medium/80">Warna</p>
                      <GoTrash
                        className="text-red-600 hover:bg-red-600 hover:text-white rounded-full p-1 text-2xl cursor-pointer"
                        onClick={() =>
                          handleRemoveColor(styleIndex, methodIndex, colorIndex)
                        }
                      />
                    </div>

                    <Select
                      urlDataApi={"/api/products/color"}
                      label={"Warna"}
                      placeholder="pilih..."
                      value={color.color_id}
                      setValue={(value: number) => {
                        const newStyles = [...styles];
                        newStyles[styleIndex].color_method[methodIndex].color[
                          colorIndex
                        ].color_id = value;
                        setStyles(newStyles);
                      }}
                      keyValue={{
                        key: "id",
                        value: "name",
                      }}
                    />

                    <Textfield
                      label={"Qty"}
                      placeholder="Jumlah"
                      type="number"
                      value={color.qty}
                      setValue={(value: number) => {
                        const newStyles = [...styles];
                        newStyles[styleIndex].color_method[methodIndex].color[
                          colorIndex
                        ].qty = value;
                        setStyles(newStyles);
                      }}
                      name={"Qty"}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <hr />

      <button
        className="p-1.5 px-2.5 border border-primary-600 text-primary-600 rounded hover:shadow disabled:bg-primary-600/50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
      >
        Simpan Pesanan
      </button>
    </div>
  );
}
