# 🎯 Smart Bunk Management System (S.B.M.S) v1.0


S.B.M.S is a lightweight utility to calculate how many lectures a student can safely miss in each subject while maintaining the minimum attendance requirement.

It’s built with simple logic but powerful math, designed for students who want to balance their academic attendance and personal time smartly.

---

## 🚀 Features

- 📊 Calculates **safe bunks per subject**
- 🧠 Uses **buffer-based distribution** for fair calculation
- ⚖️ Ensures **overall attendance doesn't drop below target**
- ♻️ Redistributes leftover bunks using a greedy approach
- 🔁 Handles edge cases like 100% or 0% attendance

---

## 🌐 Live Demo

Explore the working app here:  
🔗 [Schedule Sync](https://schedulesync-8w46.onrender.com/)

This web version uses the same smart algorithm from this repo to calculate your bunk allowance in real-time.

 <br>

## 🧮 How It Works

SmartBunks follows these steps:

1. **Calculate total attendance and lectures across all subjects**
2. **Figure out the maximum number of total bunks allowed**
3. **Analyze each subject's current attendance buffer**
4. **Distribute bunks proportionally based on that buffer**
5. **Redistribute any leftover bunks greedily (while staying safe)**
6. **Return a list of how many classes you can safely bunk per subject**

---

## 📦 Example Input

```js
const data = [
  { subject: "Math", attend: 36, total: 40 },
  { subject: "Physics", attend: 30, total: 38 },
  { subject: "English", attend: 18, total: 20 },
];

const result = calculateSmartBunks(data, 0.75);
console.log(result);
/*
[
  { subject: "Math", allocatedBunks: 1 },
  { subject: "Physics", allocatedBunks: 2 },
  { subject: "English", allocatedBunks: 0 }
]
*/
```



## 👨‍💻 Author

Made with 💙 by [Hariom Singh](https://github.com/hariom0)
