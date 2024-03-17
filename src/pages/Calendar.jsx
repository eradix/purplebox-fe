import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Calendar.css'

import {
  getAllOrders,
  orderActions,
  updateOrder,
} from "../store/order-slice";


const Calendar = () => {
  const dispatch = useDispatch();

  const { allOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrders("all"));
  }, []);

  const events = [
    { title: '2 Costomize cakes', date: '2024-02-01' },
    { title: 'event 2', date: '2024-02-02', description: 'description for All Day Event' },
  ];

  allOrders.map((item, index)=>{
    let order_info = {title: item.product.type + ' for ' + item.status , date: item.delivery_date, description: item.status};
    events.push(order_info);
  });

  return (
    <>
     <div className=" md:pr-10 md:pl-5 md:w-9/12 mt-3 md:mt-0 h-screen">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden rounded-lg calendar-view">
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        headerToolbar={{
                            left: 'prev',
                            center: 'title',
                            right: 'next'
                        }}          
                        initialView="dayGridMonth"
                        weekends={true}
                        events={events}
                        eventDisplay = "list-item"
                        contentHeight= "70vh"
                        // aspectRatio= '2'
                    />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Calendar;
