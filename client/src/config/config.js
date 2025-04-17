const config = {
    URL1 : "http://localhost:8000/api/",
    URL : "http://localhost:8001/api/",
    HOST: "http://localhost:"
}



// var data = [
//     {
//       date_time:"2023/04/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/05/21 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/05/22 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/05/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/06/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/07/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/08/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/04/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/05/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/06/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2021/07/30 01:00:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2021/08/30 01:00:00",
//       detection:"ET_INTRUSION",
//       count: 100,
//       camera:"C002"
//     },

//     {
//       date_time:"2021/06/30 01:00:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2021/06/30 02:00:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2022/06/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/07/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/08/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/09/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/10/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/11/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/12/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/04/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/05/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/06/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/07/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/08/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/09/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/10/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/04/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/05/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/06/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/07/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/04/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/05/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/06/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/07/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/08/30 15:58:00",
//       detection:"ET_PERSON",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/04/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/05/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/06/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/07/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/08/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/09/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/10/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/11/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/12/30 15:58:00",
//       detection:"ET_INTRUSION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/04/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/05/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/06/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/07/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/08/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/09/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/10/30 15:58:00",
//       detection:"ET_DIRECTION",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/04/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/05/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2024/06/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     {
//       date_time:"2023/07/30 15:58:00",
//       detection:"ET_LOITRE",
//       count: 150,
//       camera:"C002"
//     },
//     { date_time:"2024/01/01 08:00:00", detection:"ET_PERSON", count: 650, camera:"C002" },
//     { date_time:"2024/01/01 09:00:00", detection:"ET_PERSON", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 10:00:00", detection:"ET_PERSON", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 11:00:00", detection:"ET_PERSON", count: 190, camera:"C002" },
//     { date_time:"2024/01/01 12:00:00", detection:"ET_PERSON", count: 877, camera:"C002" },
//     { date_time:"2024/01/01 13:00:00", detection:"ET_PERSON", count: 357, camera:"C002" },
//     { date_time:"2024/01/01 14:00:00", detection:"ET_PERSON", count: 310, camera:"C002" },
//     { date_time:"2024/01/01 15:00:00", detection:"ET_PERSON", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 16:00:00", detection:"ET_PERSON", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 17:00:00", detection:"ET_PERSON", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 18:00:00", detection:"ET_PERSON", count: 504, camera:"C002" },
//     { date_time:"2024/01/01 19:00:00", detection:"ET_PERSON", count: 500, camera:"C002" },
//     { date_time:"2024/01/01 20:00:00", detection:"ET_PERSON", count: 900, camera:"C002" },
//     { date_time:"2024/01/01 21:00:00", detection:"ET_PERSON", count: 500, camera:"C002" },
//     { date_time:"2024/01/02 08:00:00", detection:"ET_PERSON", count: 324, camera:"C002" },
//     { date_time:"2024/01/02 09:00:00", detection:"ET_PERSON", count: 556, camera:"C002" },
//     { date_time:"2024/01/02 10:00:00", detection:"ET_PERSON", count: 789, camera:"C002" },
//     { date_time:"2024/01/02 11:00:00", detection:"ET_PERSON", count: 777, camera:"C002" },
//     { date_time:"2024/01/02 12:00:00", detection:"ET_PERSON", count: 989, camera:"C002" },
//     { date_time:"2024/01/02 13:00:00", detection:"ET_PERSON", count: 434, camera:"C002" },
//     { date_time:"2024/01/02 14:00:00", detection:"ET_PERSON", count: 565, camera:"C002" },
//     { date_time:"2024/01/02 15:00:00", detection:"ET_PERSON", count: 123, camera:"C002" },
//     { date_time:"2024/01/02 16:00:00", detection:"ET_PERSON", count: 900, camera:"C002" },
//     { date_time:"2024/01/02 17:00:00", detection:"ET_PERSON", count: 243, camera:"C002" },
//     { date_time:"2024/01/02 18:00:00", detection:"ET_PERSON", count: 564, camera:"C002" },
//     { date_time:"2024/01/02 19:00:00", detection:"ET_PERSON", count: 175, camera:"C002" },
//     { date_time:"2024/01/02 20:00:00", detection:"ET_PERSON", count: 745, camera:"C002" },
//     { date_time:"2024/01/02 21:00:00", detection:"ET_PERSON", count: 345, camera:"C002" },
//     { date_time:"2024/01/03 08:00:00", detection:"ET_PERSON", count: 264, camera:"C002" },
//     { date_time:"2024/01/03 09:00:00", detection:"ET_PERSON", count: 340, camera:"C002" },
//     { date_time:"2024/01/03 10:00:00", detection:"ET_PERSON", count: 194, camera:"C002" },
//     { date_time:"2024/01/03 11:00:00", detection:"ET_PERSON", count: 94, camera:"C002" },
//     { date_time:"2024/01/03 12:00:00", detection:"ET_PERSON", count: 100, camera:"C002" },
//     { date_time:"2024/01/03 13:00:00", detection:"ET_PERSON", count: 600, camera:"C002" },


//     { date_time:"2024/01/01 08:00:00", detection:"ET_DIRECTION", count: 200, camera:"C002" },
//     { date_time:"2024/01/01 09:00:00", detection:"ET_DIRECTION", count: 850, camera:"C002" },
//     { date_time:"2024/01/01 10:00:00", detection:"ET_DIRECTION", count: 500, camera:"C002" },
//     { date_time:"2024/01/01 11:00:00", detection:"ET_DIRECTION", count: 169, camera:"C002" },
//     { date_time:"2024/01/01 12:00:00", detection:"ET_DIRECTION", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 13:00:00", detection:"ET_DIRECTION", count: 780, camera:"C002" },
//     { date_time:"2024/01/01 14:00:00", detection:"ET_DIRECTION", count: 406, camera:"C002" },
//     { date_time:"2024/01/01 15:00:00", detection:"ET_DIRECTION", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 16:00:00", detection:"ET_DIRECTION", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 17:00:00", detection:"ET_DIRECTION", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 18:00:00", detection:"ET_DIRECTION", count: 504, camera:"C002" },
//     { date_time:"2024/01/01 19:00:00", detection:"ET_DIRECTION", count: 500, camera:"C002" },
//     { date_time:"2024/01/01 20:00:00", detection:"ET_DIRECTION", count: 900, camera:"C002" },
//     { date_time:"2024/01/01 21:00:00", detection:"ET_DIRECTION", count: 500, camera:"C002" },
//     { date_time:"2024/01/02 08:00:00", detection:"ET_DIRECTION", count: 678, camera:"C002" },
//     { date_time:"2024/01/02 09:00:00", detection:"ET_DIRECTION", count: 875, camera:"C002" },
//     { date_time:"2024/01/02 10:00:00", detection:"ET_DIRECTION", count: 123, camera:"C002" },
//     { date_time:"2024/01/02 11:00:00", detection:"ET_DIRECTION", count: 563, camera:"C002" },
//     { date_time:"2024/01/02 12:00:00", detection:"ET_DIRECTION", count: 324, camera:"C002" },
//     { date_time:"2024/01/02 13:00:00", detection:"ET_DIRECTION", count: 456, camera:"C002" },
//     { date_time:"2024/01/02 14:00:00", detection:"ET_DIRECTION", count: 111, camera:"C002" },
//     { date_time:"2024/01/02 15:00:00", detection:"ET_DIRECTION", count: 223, camera:"C002" },
//     { date_time:"2024/01/02 16:00:00", detection:"ET_DIRECTION", count: 323, camera:"C002" },
//     { date_time:"2024/01/02 17:00:00", detection:"ET_DIRECTION", count: 786, camera:"C002" },
//     { date_time:"2024/01/02 18:00:00", detection:"ET_DIRECTION", count: 132, camera:"C002" },
//     { date_time:"2024/01/02 19:00:00", detection:"ET_DIRECTION", count: 745, camera:"C002" },
//     { date_time:"2024/01/02 20:00:00", detection:"ET_DIRECTION", count: 745, camera:"C002" },
//     { date_time:"2024/01/02 21:00:00", detection:"ET_DIRECTION", count: 345, camera:"C002" },
//     { date_time:"2024/01/03 08:00:00", detection:"ET_DIRECTION", count: 450, camera:"C002" },
//     { date_time:"2024/01/03 09:00:00", detection:"ET_DIRECTION", count: 745, camera:"C002" },
//     { date_time:"2024/01/03 10:00:00", detection:"ET_DIRECTION", count: 344, camera:"C002" },
//     { date_time:"2024/01/03 11:00:00", detection:"ET_DIRECTION", count: 564, camera:"C002" },
//     { date_time:"2024/01/03 12:00:00", detection:"ET_DIRECTION", count: 740, camera:"C002" },
//     { date_time:"2024/01/03 13:00:00", detection:"ET_DIRECTION", count: 174, camera:"C002" },

    
//     { date_time:"2024/01/01 08:00:00", detection:"ET_LOITRE", count: 250, camera:"C002" },
//     { date_time:"2024/01/01 09:00:00", detection:"ET_LOITRE", count: 550, camera:"C002" },
//     { date_time:"2024/01/01 10:00:00", detection:"ET_LOITRE", count: 540, camera:"C002" },
//     { date_time:"2024/01/01 11:00:00", detection:"ET_LOITRE", count: 100, camera:"C002" },
//     { date_time:"2024/01/01 12:00:00", detection:"ET_LOITRE", count: 780, camera:"C002" },
//     { date_time:"2024/01/01 13:00:00", detection:"ET_LOITRE", count: 950, camera:"C002" },
//     { date_time:"2024/01/01 14:00:00", detection:"ET_LOITRE", count: 750, camera:"C002" },
//     { date_time:"2024/01/01 15:00:00", detection:"ET_LOITRE", count: 310, camera:"C002" },
//     { date_time:"2024/01/01 16:00:00", detection:"ET_LOITRE", count: 332, camera:"C002" },
//     { date_time:"2024/01/01 17:00:00", detection:"ET_LOITRE", count: 321, camera:"C002" },
//     { date_time:"2024/01/01 18:00:00", detection:"ET_LOITRE", count: 567, camera:"C002" },
//     { date_time:"2024/01/01 19:00:00", detection:"ET_LOITRE", count: 598, camera:"C002" },
//     { date_time:"2024/01/01 20:00:00", detection:"ET_LOITRE", count: 944, camera:"C002" },
//     { date_time:"2024/01/01 21:00:00", detection:"ET_LOITRE", count: 534, camera:"C002" },
//     { date_time:"2024/01/02 08:00:00", detection:"ET_LOITRE", count: 321, camera:"C002" },
//     { date_time:"2024/01/02 09:00:00", detection:"ET_LOITRE", count: 556, camera:"C002" },
//     { date_time:"2024/01/02 10:00:00", detection:"ET_LOITRE", count: 789, camera:"C002" },
//     { date_time:"2024/01/02 11:00:00", detection:"ET_LOITRE", count: 777, camera:"C002" },
//     { date_time:"2024/01/02 12:00:00", detection:"ET_LOITRE", count: 989, camera:"C002" },
//     { date_time:"2024/01/02 13:00:00", detection:"ET_LOITRE", count: 434, camera:"C002" },
//     { date_time:"2024/01/02 14:00:00", detection:"ET_LOITRE", count: 565, camera:"C002" },
//     { date_time:"2024/01/02 15:00:00", detection:"ET_LOITRE", count: 123, camera:"C002" },
//     { date_time:"2024/01/02 16:00:00", detection:"ET_LOITRE", count: 190, camera:"C002" },
//     { date_time:"2024/01/02 17:00:00", detection:"ET_LOITRE", count: 256, camera:"C002" },
//     { date_time:"2024/01/02 18:00:00", detection:"ET_LOITRE", count: 564, camera:"C002" },
//     { date_time:"2024/01/02 19:00:00", detection:"ET_LOITRE", count: 175, camera:"C002" },
//     { date_time:"2024/01/02 20:00:00", detection:"ET_LOITRE", count: 745, camera:"C002" },
//     { date_time:"2024/01/02 21:00:00", detection:"ET_LOITRE", count: 395, camera:"C002" },
//     { date_time:"2024/01/03 08:00:00", detection:"ET_LOITRE", count: 195, camera:"C002" },
//     { date_time:"2024/01/03 09:00:00", detection:"ET_LOITRE", count: 565, camera:"C002" },
//     { date_time:"2024/01/03 10:00:00", detection:"ET_LOITRE", count: 225, camera:"C002" },
//     { date_time:"2024/01/03 11:00:00", detection:"ET_LOITRE", count: 756, camera:"C002" },
//     { date_time:"2024/01/03 12:00:00", detection:"ET_LOITRE", count: 123, camera:"C002" },
//     { date_time:"2024/01/03 13:00:00", detection:"ET_LOITRE", count: 784, camera:"C002" },




//     { date_time:"2024/01/01 08:00:00", detection:"ET_INTRUSION", count: 320, camera:"C002" },
//     { date_time:"2024/01/01 09:00:00", detection:"ET_INTRUSION", count: 850, camera:"C002" },
//     { date_time:"2024/01/01 10:00:00", detection:"ET_INTRUSION", count: 550, camera:"C002" },
//     { date_time:"2024/01/01 11:00:00", detection:"ET_INTRUSION", count: 169, camera:"C002" },
//     { date_time:"2024/01/01 12:00:00", detection:"ET_INTRUSION", count: 359, camera:"C002" },
//     { date_time:"2024/01/01 13:00:00", detection:"ET_INTRUSION", count: 780, camera:"C002" },
//     { date_time:"2024/01/01 14:00:00", detection:"ET_INTRUSION", count: 406, camera:"C002" },
//     { date_time:"2024/01/01 15:00:00", detection:"ET_INTRUSION", count: 350, camera:"C002" },
//     { date_time:"2024/01/01 16:00:00", detection:"ET_INTRUSION", count: 780, camera:"C002" },
//     { date_time:"2024/01/01 17:00:00", detection:"ET_INTRUSION", count: 531, camera:"C002" },
//     { date_time:"2024/01/01 18:00:00", detection:"ET_INTRUSION", count: 504, camera:"C002" },
//     { date_time:"2024/01/01 19:00:00", detection:"ET_INTRUSION", count: 500, camera:"C002" },
//     { date_time:"2024/01/01 20:00:00", detection:"ET_INTRUSION", count: 924, camera:"C002" },
//     { date_time:"2024/01/01 21:00:00", detection:"ET_INTRUSION", count: 507, camera:"C002" },
//     { date_time:"2024/01/02 08:00:00", detection:"ET_INTRUSION", count: 671, camera:"C002" },
//     { date_time:"2024/01/02 09:00:00", detection:"ET_INTRUSION", count: 897, camera:"C002" },
//     { date_time:"2024/01/02 10:00:00", detection:"ET_INTRUSION", count: 122, camera:"C002" },
//     { date_time:"2024/01/02 11:00:00", detection:"ET_INTRUSION", count: 564, camera:"C002" },
//     { date_time:"2024/01/02 12:00:00", detection:"ET_INTRUSION", count: 321, camera:"C002" },
//     { date_time:"2024/01/02 13:00:00", detection:"ET_INTRUSION", count: 121, camera:"C002" },
//     { date_time:"2024/01/02 14:00:00", detection:"ET_INTRUSION", count: 781, camera:"C002" },
//     { date_time:"2024/01/02 15:00:00", detection:"ET_INTRUSION", count: 433, camera:"C002" },
//     { date_time:"2024/01/02 16:00:00", detection:"ET_INTRUSION", count: 322, camera:"C002" },
//     { date_time:"2024/01/02 17:00:00", detection:"ET_INTRUSION", count: 978, camera:"C002" },
//     { date_time:"2024/01/02 18:00:00", detection:"ET_INTRUSION", count: 632, camera:"C002" },
//     { date_time:"2024/01/02 19:00:00", detection:"ET_INTRUSION", count: 734, camera:"C002" },
//     { date_time:"2024/01/02 20:00:00", detection:"ET_INTRUSION", count: 274, camera:"C002" },
//     { date_time:"2024/01/02 21:00:00", detection:"ET_INTRUSION", count: 134, camera:"C002" },
//     { date_time:"2024/01/03 08:00:00", detection:"ET_INTRUSION", count: 455, camera:"C002" },
//     { date_time:"2024/01/03 09:00:00", detection:"ET_INTRUSION", count: 234, camera:"C002" },
//     { date_time:"2024/01/03 10:00:00", detection:"ET_INTRUSION", count: 300, camera:"C002" },
//     { date_time:"2024/01/03 11:00:00", detection:"ET_INTRUSION", count: 560, camera:"C002" },
//     { date_time:"2024/01/03 12:00:00", detection:"ET_INTRUSION", count: 740, camera:"C002" },
//     { date_time:"2024/01/03 13:00:00", detection:"ET_INTRUSION", count: 170, camera:"C002" },
// ]

export {config}