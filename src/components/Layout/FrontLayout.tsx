import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import { useState } from 'react'
import AppModal from '../AppModal'

// type FrontLayoutProps = {
//     children?: React.ReactNode
// }

export default function FrontLayout() {
    const [openCurrentEvent, setOpenCurrentEvent] = useState(false)

    return (
        <>
            {openCurrentEvent && (
                <AppModal
                    title="Special Event"
                    close={() => setOpenCurrentEvent(false)}
                >
                    <img
                        className="w-100"
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }./images/event.png`}
                        alt={`${import.meta.env.VITE_APP_NAME} - Event`}
                    />
                </AppModal>
            )}
            <Navbar />
            <section
                style={{
                    marginTop: '100px', // this is how many pxs the fixed navbar is
                }}
            >
                <Outlet />
            </section>
        </>
    )
}
