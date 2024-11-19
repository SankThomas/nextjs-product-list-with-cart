"use client";

import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CartContext } from "@/context/cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function Cart({ toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    <div className="fixed inset-0 h-screen w-9/12 overflow-y-auto bg-neutral-900 px-4 py-10 md:w-[500px]">
      <h2 className="flex flex-wrap items-center justify-between gap-4 text-2xl font-bold text-white">
        Your cart{" "}
        <Button variant="secondary" onClick={toggle}>
          <XIcon />
        </Button>
      </h2>

      <div className="my-8 space-y-4">
        {cartItems.map((product, index) => (
          <Card
            key={index}
            className="border-neutral-700 bg-neutral-800 text-white"
          >
            <CardHeader>
              <Image
                src={product.image.thumbnail}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-lg"
              />
            </CardHeader>

            <CardContent className="space-y-2">
              <CardTitle>{product.name}</CardTitle>
              <ul className="flex items-center gap-2">
                <li>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => removeFromCart(product)}
                  >
                    -
                  </Button>
                </li>
                <li>{product.quantity}</li>
                <li>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </Button>
                </li>
              </ul>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {cartItems.length > 0 ? (
        <div className="space-y-4">
          <CardTitle className="text-white">
            Total: ${getCartTotal().toFixed(2)}
          </CardTitle>

          <Button variant="destructive" onClick={() => clearCart()}>
            <Trash2 /> Clear Cart
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-white">
            Add items to your cart to see them here...
          </p>
          <Button variant="secondary" onClick={toggle}>
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );
}
