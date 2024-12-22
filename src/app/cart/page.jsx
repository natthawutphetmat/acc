"use client";

import QRCode from 'qrcode.react';

 

import { useState, useEffect } from "react";

import generatePayload from 'promptpay-qr';



export default function CartPage() {

  const [cartItems, setCartItems] = useState([]);

  const [total, setTotal] = useState(0);

  const [qrCode, setQrCode] = useState("");

  const [copySuccess, setCopySuccess] = useState(false);



  // โหลดข้อมูลตะกร้าจาก localStorage

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(storedCart);

  }, []);



  // คำนวณยอดรวมทุกครั้งที่ cartItems มีการเปลี่ยนแปลง

  useEffect(() => {
    try {
        const totalAmount = cartItems.reduce((sum, item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);

            // ตรวจสอบค่า price และ quantity ก่อนนำมาคำนวณ
            if (isNaN(price) || isNaN(quantity)) {
                console.error("Invalid price or quantity:", item); // log ข้อมูล item ที่มีปัญหา
                throw new Error("Invalid price or quantity.");
            }

            return sum + price * quantity;
        }, 0);

        setTotal(totalAmount);
        // ... ส่วนการสร้าง QR Code
    } catch (error) {
        console.error("Error calculating total:", error);
        // ... การจัดการ error
    }
}, [cartItems]);


  // ฟังก์ชันลบสินค้าออกจากตะกร้า

  const handleRemoveItem = (id) => {

    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

  };



  return (

    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>

      {cartItems.length === 0 ? (

        <p>Your cart is empty.</p>

      ) : (

        <div className="cartbox d-flex">

          <div className="cartb">

            {cartItems.map((item) => (

              <div

                key={item.id}

                style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}

              >

                <h2>{item.name}</h2>

                <p><b>ราคาบัญชีละ: ${item.price}</b></p>

                <p><b>จำนวนที่ต้องการ: {item.quantity}</b></p>

                {/* ปุ่ม "X" อยู่ในส่วนนี้ */}

                <div className="btn" style={{ marginTop: "10px" }}>

                  <button onClick={() => handleRemoveItem(item.id)}>X</button>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}


<div value={qrCode} />

</div>

     

  );

}


