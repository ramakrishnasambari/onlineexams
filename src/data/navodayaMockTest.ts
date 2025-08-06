export interface Question {
  number: number;
  question: string;
  questiontype: 'img' | 'txt';
  options: { [key: string]: string | number };
  correctanswer: string;
  studentanswer: string;
}

export interface Part {
  part: string;
  description: string;
  questionList: Question[];
}

export interface Section {
  section: string;
  description: string;
  parts: Part[];
}

export interface TestData {
  questions: Section[];
}

export const navodayaMockTestData: TestData = {
  "questions": [
    {
      "section": "SECTION–1: MENTAL ABILITY TEST",
      "description":"NA",
      "parts": [
        {
          "part": "PART–I",
          "description": "DIRECTIONS: In Question Nos. 1 to 4, four figures (A), (B), (C) and (D) have been given in each question. Of these four figures, three figures are similar in some way and one figure is different. Select the figure which is different. Darken the circle for the answer in the OMR Answer Sheet against the number corresponding to the question.",
          "questionList": [
            {
              "number": 1,
              "question": "1.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 2,
              "question": "2.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "C",
              "studentanswer": ""
            },
            {
              "number": 3,
              "question": "3.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 4,
              "question": "4.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "D",
              "studentanswer": ""
            }
          ]
        },
        {
          "part": "PART–II",
          "description": "DIRECTIONS: In Question Nos. 5 to 8, four figures (A), (B), (C) and (D) have been given in each question. Of these four figures, three figures are similar in some way and one figure is different. Select the figure which is different. Darken the circle for the answer in the OMR Answer Sheet against the number corresponding to the question.",
          "questionList": [
            {
              "number": 5,
              "question": "1.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 6,
              "question": "2.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "C",
              "studentanswer": ""
            },
            {
              "number": 7,
              "question": "3.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 8,
              "question": "4.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "D",
              "studentanswer": ""
            }
          ]
        },
        {
          "part": "PART–III",
          "description": "DIRECTIONS: In Question Nos. 9 to 12, four figures (A), (B), (C) and (D) have been given in each question. Of these four figures, three figures are similar in some way and one figure is different. Select the figure which is different. Darken the circle for the answer in the OMR Answer Sheet against the number corresponding to the question.",
          "questionList": [
            {
              "number": 9,
              "question": "1.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 10,
              "question": "2.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "C",
              "studentanswer": ""
            },
            {
              "number": 11,
              "question": "3.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 12,
              "question": "4.png",
              "questiontype": "img",
              "options": { "A": "(A)", "B": "(B)", "C": "(C)", "D": "(D)" },
              "correctanswer": "D",
              "studentanswer": ""
            }
          ]
        }
      ]
    },
    {
      "section": "SECTION–2: ARITHMETIC TEST",
      "description": "This section contains arithmetic problems that test your mathematical skills.",
      "parts": [
        {
          "part": "PART–I",
          "description": "DIRECTIONS: Solve the following arithmetic problems. Choose the correct answer from the given options.",
          "questionList": [
            {
              "number": 13,
              "question": "What is 15 + 27?",
              "questiontype": "txt",
              "options": { "A": "40", "B": "42", "C": "41", "D": "43" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 14,
              "question": "If 8 × 7 = 56, then what is 8 × 8?",
              "questiontype": "txt",
              "options": { "A": "64", "B": "65", "C": "63", "D": "62" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 15,
              "question": "What is 100 ÷ 4?",
              "questiontype": "txt",
              "options": { "A": "20", "B": "25", "C": "30", "D": "15" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 16,
              "question": "If a rectangle has length 12 and width 8, what is its area?",
              "questiontype": "txt",
              "options": { "A": "96", "B": "88", "C": "104", "D": "92" },
              "correctanswer": "A",
              "studentanswer": ""
            }
          ]
        },
        {
          "part": "PART–II",
          "description": "DIRECTIONS: Solve the following word problems. Choose the correct answer from the given options.",
          "questionList": [
            {
              "number": 17,
              "question": "A shopkeeper sold 25 books for ₹500. What is the cost of one book?",
              "questiontype": "txt",
              "options": { "A": "₹15", "B": "₹20", "C": "₹25", "D": "₹30" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 18,
              "question": "If 3 workers can complete a job in 6 days, how many days will 2 workers take?",
              "questiontype": "txt",
              "options": { "A": "8 days", "B": "9 days", "C": "10 days", "D": "12 days" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 19,
              "question": "What is 20% of 150?",
              "questiontype": "txt",
              "options": { "A": "25", "B": "30", "C": "35", "D": "40" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 20,
              "question": "If a train travels 120 km in 2 hours, what is its speed in km/h?",
              "questiontype": "txt",
              "options": { "A": "50 km/h", "B": "60 km/h", "C": "70 km/h", "D": "80 km/h" },
              "correctanswer": "B",
              "studentanswer": ""
            }
          ]
        }
      ]
    },
    {
      "section": "SECTION–3: LANGUAGE TEST",
      "description": "This section tests your language skills including grammar, vocabulary, and comprehension.",
      "parts": [
        {
          "part": "PART–I",
          "description": "DIRECTIONS: Choose the correct word to complete the sentence.",
          "questionList": [
            {
              "number": 21,
              "question": "The sun _____ in the east.",
              "questiontype": "txt",
              "options": { "A": "rise", "B": "rises", "C": "rising", "D": "risen" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 22,
              "question": "She _____ to school every day.",
              "questiontype": "txt",
              "options": { "A": "go", "B": "goes", "C": "going", "D": "gone" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 23,
              "question": "The book _____ on the table.",
              "questiontype": "txt",
              "options": { "A": "is", "B": "are", "C": "was", "D": "were" },
              "correctanswer": "A",
              "studentanswer": ""
            },
            {
              "number": 24,
              "question": "They _____ playing in the garden.",
              "questiontype": "txt",
              "options": { "A": "is", "B": "are", "C": "was", "D": "were" },
              "correctanswer": "B",
              "studentanswer": ""
            }
          ]
        },
        {
          "part": "PART–II",
          "description": "DIRECTIONS: Choose the word that means the same as the given word.",
          "questionList": [
            {
              "number": 25,
              "question": "What is the synonym of 'happy'?",
              "questiontype": "txt",
              "options": { "A": "sad", "B": "joyful", "C": "angry", "D": "tired" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 26,
              "question": "What is the synonym of 'big'?",
              "questiontype": "txt",
              "options": { "A": "small", "B": "large", "C": "tiny", "D": "short" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 27,
              "question": "What is the synonym of 'quick'?",
              "questiontype": "txt",
              "options": { "A": "slow", "B": "fast", "C": "lazy", "D": "tired" },
              "correctanswer": "B",
              "studentanswer": ""
            },
            {
              "number": 28,
              "question": "What is the synonym of 'beautiful'?",
              "questiontype": "txt",
              "options": { "A": "ugly", "B": "pretty", "C": "dirty", "D": "old" },
              "correctanswer": "B",
              "studentanswer": ""
            }
          ]
        }
      ]
    }
  ]
}; 