'use client';

import { useState } from 'react';
import './styles.css'; 

interface Record {
  id: number;
  amount: number;
  date: string;
  type: string;
  note: string;
}

export default function Home() {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('income'); 
  const [note, setNote] = useState('');
  const [records, setRecords] = useState<Record[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: Record = {
      id: Date.now(),
      amount: parseFloat(amount),
      date,
      type,
      note,
    };

    setRecords([...records, newRecord]);

   
    setAmount('');
    setDate('');
    setNote('');
  };

  const incomeRecords = records.filter(record => record.type === 'income');
  const expenseRecords = records.filter(record => record.type === 'expense');

  const totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalExpense = expenseRecords.reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="container">
      <h1>บันทึกรายรับรายจ่าย</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>จำนวน:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>วันที่:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ประเภท:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </select>
        </div>
        <div>
          <label>บันทึกรายละเอียด:</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <button type="submit">เพิ่มรายการ</button>
      </form>

      <div className="records-container">
        <div className="records-section">
          <h2>รายการรายรับ</h2>
          {incomeRecords.length === 0 ? (
            <p>ไม่มีรายการรายรับ</p>
          ) : (
            <ul>
              {incomeRecords.map((record) => (
                <li key={record.id} className={record.type}>
                  {record.date} - +{record.amount} บาท {record.note && `- Note: ${record.note}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="records-section">
          <h2>รายการรายจ่าย</h2>
          {expenseRecords.length === 0 ? (
            <p>ไม่มีรายการรายจ่าย</p>
          ) : (
            <ul>
              {expenseRecords.map((record) => (
                <li key={record.id} className={record.type}>
                  {record.date} - -{record.amount} บาท {record.note && `- Note: ${record.note}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="summary">
        <h2>ยอดรวม</h2>
        <p><strong>รายรับ:</strong> {totalIncome} บาท</p>
        <p><strong>รายจ่าย:</strong> {totalExpense} บาท</p>
      </div>
    </div>
  );
}
