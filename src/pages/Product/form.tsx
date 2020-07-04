import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Api from "../../services/api";

import { Form, message, Input, Button, Select, Divider } from "antd";

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
  price: number;
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

  useEffect(() => {
    Api.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  const handleSubmit = useCallback(async (product: Product) => {
    product.stock = product.stockMask.number;

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
      message.error("Validations Fails: check your data!");
    }
  }, []);

  useEffect(() => {
    handleClearForm();
    form.setFieldsValue({
      name: selectedProduct?.name,
      description: selectedProduct?.description,
      category_id: selectedProduct?.category_id,
      price: selectedProduct?.price,
      stockMask: {
        number: selectedProduct?.stock,
        currency: "rmb",
      },
    });
  }, [selectedProduct]);

  const handleClearForm = () => {
    form.resetFields();
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
      key="form-product"
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
        <Input placeholder="Please input price" />
      </Form.Item>

      <Form.Item
        label="Stock"
        name="stockMask"
        rules={[{ validator: checkStock }]}
      >
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
