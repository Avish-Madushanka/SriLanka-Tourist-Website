<?php 




$email              = $_POST['email'];
$contact            = $_POST['contact'];
$location           = $_POST['location'];
$date               = $_POST['date'];








//create connection

$conn=mysqli_connect("localhost", "root", "avioniks2126", "malcolmp");

if (isset($_POST['submit'])) {
    $sql = "INSERT INTO tbl_contact (
    email,
    contact,
    location,
    date



    )



VALUES(
    '$email',
    '$contact',           
    '$location',
    '$date'

)";





    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('You have successfully inserted the data');</script>";
echo "<script type='text/javascript'> document.location ='contact.html'; </script>";
} else{
echo "<script>alert('Something Went Wrong. Please try again');</script>";
}
}

?>