import React from 'react';

// async function SetupDb() {
//   const dbName = 'cardsterDB';
//   const storeName = 'store0';
//   const version = 1; //versions start at 1

//   const db = await openDB(dbName, version, {
//     upgrade(db, oldVersion, newVersion, transaction) {
//       const store = db.createObjectStore(storeName);
//       store.put('Hello world!', 'Hello');
//     }
//   });

//   const tx = db.transaction(storeName, 'readwrite');
//   const store = await tx.objectStore(storeName);

//   const val = 'hey!';
//   const key = 'Hello again';
//   const value = await store.put(val, key);
//   await tx.done;

//   const item = await db
//     .transaction(storeName)
//     .objectStore(storeName)
//     .get(key);
//   console.log(item);
// }

function AddCardster(props) {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (question !== '' && answer !== '') {
      props.addCards(question, answer);
      setQuestion('');
      setAnswer('');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  return (
    <form className='AddCardster' onSubmit={handleSubmit}>
      <label className='field'>
        Question:
        <input
          className='input-field'
          value={question}
          onChange={e => setQuestion(e.target.value)}
        ></input>
      </label>
      <label className='field'>
        Answer:
        <input
          className='input-field'
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        ></input>
      </label>
      <button className='add-btn' type='submit'>
        <div
          className={(() => {
            if (loading) {
              return 'loader';
            }
            return '';
          })()}
        ></div>
        {loading ? '' : 'Add'}
      </button>
    </form>
  );
}

export default AddCardster;
