import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Api from "../../services/api";

import {
  Form,
  message,
  Input,
  Button,
  Select,
  InputNumber,
  Divider,
} from "antd";

import InputNumberCustom from "../../components/InputNumber";

interface Category {
  id: number;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  price: any;
  stock: number;
  stockMask: {
    number: number | 0;
  };
}

type Props = {
  selectedProduct?: Product;
  onLoadProducts(): void;
};

const ProductForm: React.FC<Props> = ({ selectedProduct, onLoadProducts }) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [categories, setCategories] = useState<Category[]>([]);
  // const [price, setPrice] = useState();

  useEffect(() => {
    Api.get("/categories").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    });
  }, []);

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  const handleSubmit = useCallback(async (product: Product) => {
    // console.log("data: ", JSON.stringify(product));
    // const number = 123456.789;
    // console.log(new Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(number));

    product.stock = product.stockMask.number;
    product.price = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(product.price)
      .toString();

    try {
      if (selectedProduct?.id) {
        const response = await Api.put(
          `/products/${selectedProduct?.id}`,
          product
        );
        message.success(response.data.message);
      } else {
        const response = await Api.post(`/products/`, product);
        message.success(response.data.message);
      }

      handleClearForm();
      onLoadProducts();
      history.push("/product");
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  }, []);

  useEffect(() => {
    handleClearForm();
    form.setFieldsValue({
      name: selectedProduct?.name,
      description: selectedProduct?.description,
      category_id: selectedProduct?.category_id,
      price: selectedProduct?.price
        ? selectedProduct?.price.replace("$", "")
        : "",
      stockMask: {
        number: selectedProduct?.stock,
        currency: "rmb",
      },
    });
  }, [selectedProduct]);

  const handleClearForm = () => {
    form.resetFields();
  };

  const onChangePrice = (price: any) => {
    console.log("price:" + price);
    console.log(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
    );
  };

  const checkStock = (rule: any, value: any) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject("Number must be greater than zero!");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      // initialValues={{ size: "large" }}
      size="large"
      onFinish={onFinish}
      initialValues={{
        size: "large",
        stock: {
          number: 0,
          currency: "rmb",
        },
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name",
          },
        ]}
      >
        <Input placeholder="Please input name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input description",
          },
        ]}
      >
        <Input placeholder="Please input description" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category_id"
        hasFeedback
        rules={[{ required: true, message: "Please select category!" }]}
      >
        <Select placeholder="Please select a option">
          {categories.map((category) => (
            <Select.Option value={category.id}>
              {category.description}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please input price",
          },
        ]}
      >
        <InputNumber
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={onChangePrice}
          placeholder="Please input price"
        />
        {/* <Input placeholder="Please input price" /> */}
      </Form.Item>

      <Form.Item
        label="Stock"
        name="stockMask"
        rules={[{ validator: checkStock }]}
      >
        {/* <InputNumber placeholder="Please input stock" /> */}
        <InputNumberCustom />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Divider type="vertical" />
        <Button htmlType="button" onClick={handleClearForm}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
