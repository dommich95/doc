import React, { useState, useEffect, HTMLAttributes } from 'react';
import { DefaultApi } from '../API/apis/DefaultApi';
import { Doctor } from '@/API';
import Card from '@/components/Card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { AddNewDoctor } from '@/components/AddNewDoc';
import Slider from 'react-slick';

const api = new DefaultApi();

async function getDoctors(page: number) {
  try {
    const res = await api.apiDoctorsGet({ page: page });
    return res.results;
  } catch (error) {
    throw error;
  }
}

const breakpoints = [
  { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 2 } },
  { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 3 } },
  { breakpoint: 9999, settings: { slidesToShow: 4, slidesToScroll: 4 } },
];

export default function Page({ initaleDoctors }: { initaleDoctors: Doctor[] }) {
  const [doctors, setDoctors] = useState(initaleDoctors);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataAvailable, setDataAvailable] = useState(true);
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#22B3A7' : '#344597';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const initialData = await getDoctors(currentPage);
        setDoctors(initialData as Doctor[]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchNextPage = async () => {
    try {
      const nextPage = currentPage + 1;
      setLoading(true);
      const newDoctors = await getDoctors(nextPage);

      if (newDoctors && newDoctors.length > 0) {
        setDoctors(prevDoctors => [...prevDoctors, ...newDoctors]);
        setCurrentPage(nextPage);
      } else {
        setDataAvailable(false);
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (editedDoctor: Doctor) => {
    const index = doctors.findIndex(doctor => doctor.id === editedDoctor.id);

    if (index !== -1) {
      setDoctors(prevDoctors => [
        ...prevDoctors.slice(0, index),
        editedDoctor,
        ...prevDoctors.slice(index + 1),
      ]);
    }
  };

  const handleDelete = (doctorId: number) => {
    setDoctors(prevDoctors =>
      prevDoctors.filter(doctor => doctor.id !== doctorId)
    );
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    nextArrow: <NextArrow iconColor={iconColor} loading={loading} />,
    prevArrow: <PrevArrow iconColor={iconColor} loading={loading} />,
    afterChange: (currentSlide: number) => {
      if (dataAvailable && currentSlide >= doctors.length - 4) {
        fetchNextPage();
      }
    },
    responsive: breakpoints.map(breakpoint => ({
      breakpoint: breakpoint.breakpoint,
      settings: breakpoint.settings,
    })),
  };

  return (
    <div className="w-auto max-w-[1300px] m-auto mt-10 px-5">
      {doctors && doctors.length > 0 && (
        <Slider {...sliderSettings} className="rounded-xl relative">
          {doctors.map(doctor => (
            <Card
              key={doctor.id}
              doctor={doctor}
              onEdit={handleEdit}
              onDelete={() => handleDelete(doctor.id as number)}
            />
          ))}
        </Slider>
      )}
      <AddNewDoctor />
    </div>
  );
}

interface ArrowProps extends HTMLAttributes<HTMLDivElement> {
  iconColor?: string;
  loading?: boolean;
}

const NextArrow: React.FC<ArrowProps> = ({ iconColor, loading, ...props }) => (
  <div
    {...props}
    className="hover:cursor-pointer absolute top-[105%] right-[30%] sm:right-[40%] "
  >
    <button disabled={loading}>
      <ChevronRightIcon width={40} height={40} color={iconColor} />
    </button>
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ iconColor, loading, ...props }) => (
  <div
    {...props}
    className="absolute top-[105%] transform -translate-x-1/2 left-[30%] sm:left-[40%]"
  >
    <button disabled={loading}>
      <ChevronLeftIcon width={40} height={40} color={iconColor} />
    </button>
  </div>
);
export async function getServerSideProps() {
  try {
    const doctors = await getDoctors(1);
    return {
      props: {
        doctors,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        doctors: [],
      },
    };
  }
}
