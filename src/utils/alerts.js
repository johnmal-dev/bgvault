import Swal from 'sweetalert2';

const successAlert = (text) => {
  Swal.fire({
    position: 'bottom-end',
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 2000,
  });
};

const errorAlert = (text) => {
  Swal.fire({
    position: 'bottom-end',
    icon: 'error',
    title: text,
    showConfirmButton: false,
    timer: 2000,
  });
};

const deletePrompt = (gameKey, gameName, location, callback) => {
  Swal.fire({
    title: `Are you sure you want to delete ${gameName} from your ${location}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      callback(gameKey);
    }
  });
};

export { successAlert, errorAlert, deletePrompt };
