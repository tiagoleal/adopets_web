import React, { useState, useEffect, useCallback } from "react";

import Api from "../../services/api";

import "antd/dist/antd.css";
import { message, Table, Divider, Drawer, Typography } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import ButtonConfirm from "../../components/Button/Confirm";
import ButtonCustom from "../../components/Button/Common";

import ProductForm from "./form";
import ProductSearch from "./search";

const { Title } = Typography;

type ProductTransaction = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  category: string;
  price: number;
  stock: number;
  totalRegister?: number;
};

const Product = () => {
  const [visibleShowDrawer, setVisibleDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [productList, setProductList] = useState<ProductTransaction[]>([]);
  const [totalRegister, setTotalRegister] = useState(0);

  useEffect(() => {
    onLoadProducts();
  }, []);

  const onLoadProducts = useCallback(
    (params = {}) => {
      try {
        Api.get("products", {
          params,
        }).then((response) => {
          const products = response.data.map((product: ProductTransaction) => {
            return {
              ...product,
              key: product.id,
            };
          });

          setProductList(products);
          setTotalRegister(response.headers["x-total-count"]);
        });
      } catch (error) {
        message.error(error);
      }
    },
    [productList]
  );

  const handleAddProduct = () => {
    setSelectedProduct({} as ProductTransaction);
    showDrawer();
  };

  const handleEditProduct = (product: ProductTransaction) => {
    showDrawer();
    setSelectedProduct(product);
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await Api.delete(`products/${id}`);
      message.success(response.data.message);
      onLoadProducts();
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "UUID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 2,
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 2,
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: {
        compare: (a: any, b: any) => a.description - b.description,
        multiple: 2,
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: {
        compare: (a: any, b: any) => a.category - b.category,
        multiple: 2,
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a: any, b: any) => a.price - b.price,
        multiple: 2,
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: {
        compare: (a: any, b: any) => a.stock - b.stock,
        multiple: 2,
      },
    },
    {
      title: "Action",
      key: "action",
      render: (action: any, product: ProductTransaction) => {
        return (
          <>
            <ButtonCustom
              name="Edit"
              icon={<EditOutlined />}
              onClickAction={() => handleEditProduct(product)}
            />

            <Divider type="vertical" />
            <ButtonConfirm
              name="Delete"
              title="Are you sure delete this product?"
              content={`UUID: ${product.id} - Product: ${product.name}`}
              icon={<DeleteOutlined />}
              onConfirm={() => handleDeleteProduct(product.id)}
              danger={true}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Divider type="vertical" />
        <Title level={4}>List Product</Title>

        <ButtonCustom
          name="Add"
          icon={<PlusOutlined />}
          onClickAction={handleAddProduct}
        />
      </div>

      <Drawer
        title={selectedProduct?.id ? "Edit Product" : "Add Product"}
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={visibleShowDrawer}
      >
        <ProductForm
          key={selectedProduct?.id}
          selectedProduct={selectedProduct}
          onLoadProducts={onLoadProducts}
        />
      </Drawer>

      <ProductSearch
        key="search-product"
        totalItems={totalRegister}
        onLoadProducts={onLoadProducts}
      />
      <br />

      <Table
        rowKey="id"
        columns={columns}
        pagination={false}
        dataSource={productList}
      />
    </div>
  );
};

export default Product;
