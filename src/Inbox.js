import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Inbox = () => {
  const mail = useSelector(state => state.inbox.items)
  const email = useSelector(state => state.mail.email)
  const color = [
    '#add8e6',
    '#90ee90',
    '#ffffe0',
    '#ffb6c1',
    '#e6e6fa',
    '#ffdab9',
    '#f5fffa',
    '#f08080',
    '#c0c0c0',
    '#fafad2'
  ]

  return (
    <div className='w-100 mx-5'>
      <h2 className='text-center'>Inbox</h2>
      <ul className="list-group px-2">
        {mail.map((item, index) => {
          if (item.sender !== email && item.recipient===email) {
            return (
              <Link to={`/inbox/${item.id}`} key={index}>
                <li className="list-group-item">
                  <div className='d-flex gap-1'>
                    <div style={{ backgroundColor: color[item.id[0]], height: '40px', width: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{item.sender[0]}
                    </div>
                    <h5 className="mt-2 ">{item.sender}</h5>
                    <div className=''><div className={!item.seen ? 'dot' : ''}></div></div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p className="mb-0 pl-2 pr-2">{item.content}</p>
                    <p className="mb-0 ">{item.time}</p>
                  </div>
                </li>
              </Link>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default Inbox;
