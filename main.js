import {
    auth,
    onAuthStateChanged,
    signOut,
    getDocs,
    collection,
    db,
    deleteDoc,
    doc,
  } from "./firebaseConfig.js";
  
  onAuthStateChanged(auth, (user) => {
    // trạng  thái thay đổi của ng dùng 
    if (user) {
      console.log("Người dùng đang online");
      const noUser = document.getElementById("no-user");
      noUser.style.display = "none";
  
      const logOut = document.getElementById("logOut");
      logOut.addEventListener("click", function () {
        signOut(auth)
          .then(() => {
            confirm("Bạn có muốn Đăng xuất ko ?");
            window.location.assign("./index.html");
          })
          .catch((error) => {
            alert("Đăng xuất thất bại");
          });
      });
      // ...
    } else {
      // User is signed out
      // ...
      console.log("Người Dùng đã đăng xuất hoặc chưa đăng nhập");
      const headerRight = document.getElementById("header-right");
      headerRight.style.display = "none";
    }
  });


  // =================== RED DATA ====================
let products = document.getElementById("products");

const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
  const productId = doc.id;
  console.log("🚀 ~ querySnapshot.forEach ~ productId:", productId)
  const productData = doc.data();
  console.log("🚀 ~ querySnapshot.forEach ~ productData:", productData)
 
  // console.log("🚀 ~ querySnapshot.forEach ~ productInfo:", productInfo);
  products.innerHTML += `
    <a class="post-item" href="detail.html?id=${productId}">
            <img src="${productData.image}" alt="" />
            <h4> ${productData.name} </h4>
            <p>
              ${productData.des}
            </p>
            <div class="post-item-author">
              <img src="./image/th.jfif" alt="" />
              <div class="post-item-author-des">
                <p>Wade Warren</p>
                <!-- <p class="line"></p> -->

                <p>2nd January,2022</p>
              </div>
            </div>
          </a>
  `;
});