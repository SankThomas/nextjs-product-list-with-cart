"use client";

import products from "@/data.json";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "@/context/cart";
import Cart from "./cart";

export default function Products() {
  const [showCart, setShowCart] = useState(false);
  const { cartItems, addToCart } = useContext(CartContext);

  const toggle = () => {
    setShowCart(!showCart);
  };

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={toggle}>Cart ({cartItems && cartItems.length})</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products.map((product, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src={product.image.desktop}
                alt={product.name}
                width={1920}
                height={1080}
                className="w-full rounded-lg"
              />
              <Button onClick={() => addToCart(product)}>
                <ShoppingCart /> Add to cart
              </Button>
            </CardHeader>

            <CardContent className="space-y-2">
              <CardDescription>{product.category}</CardDescription>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {showCart && <Cart toggle={toggle} />}
    </section>
  );
}
