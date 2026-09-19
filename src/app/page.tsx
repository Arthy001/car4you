"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FilterBar from "@/components/cars/FilterBar";
import CarGrid from "@/components/cars/CarGrid";
import MapView from "@/components/cars/MapView";
import Pagination from "@/components/common/Pagination";
import Footer from "@/components/layout/Footer";
import CarModal from "@/components/cars/CarModal";
import ListCarModal from "@/components/cars/ListCarModal";
import SettingsModal from "@/components/common/SettingsModal";
import { initialCarsData } from "@/lib/data/mockCars";
import { Car, FilterState } from "@/types";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function HomePage() {
  // Cars data state
  const [cars, setCars] = useState<Car[]>(initialCarsData);
  const [favorites, setFavorites] = useState<string[]>(["car-1", "car-2", "car-4", "car-7", "car-8"]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showListCarModal, setShowListCarModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(3);

  // Filter state for Used Car Marketplace
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    location: "",
    carTypes: [],
    fuelTypes: [],
    minPrice: 0,
    maxPrice: 50000,
    transmission: [],
    seats: [],
    condition: "",
    sortBy: "recommended",
  });

  // Fetch cars from Supabase if configured
  useEffect(() => {
    async function loadCars() {
      if (!isSupabaseConfigured) return;
      try {
        setLoading(true);
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
          const { data, error } = await supabase.from("cars").select("*");
          if (!error && data && data.length > 0) {
            setCars(data as Car[]);
          }
        }
      } catch (err) {
        console.warn("Supabase fetch error, fallback to initial dataset:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  // Filter cars based on used car filter state
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const carPrice = car.price || (car.price_per_day ? car.price_per_day * 100 : 15000);

      // Search term (name, brand, category, description)
      if (filters.searchTerm) {
        const query = filters.searchTerm.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesLocation = car.location_address.toLowerCase().includes(query);
        const matchesCategory = car.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesLocation && !matchesCategory) return false;
      }

      // Location filter
      if (filters.location) {
        const query = filters.location.toLowerCase();
        const matchesLocation = car.location_address.toLowerCase().includes(query);
        if (!matchesLocation) return false;
      }

      // Car Types (Sedan, SUV, Hatchback, Electric, Van, Compact)
      if (filters.carTypes.length > 0) {
        if (!filters.carTypes.includes(car.category)) {
          return false;
        }
      }

      // Fuel Types
      if (filters.fuelTypes.length > 0) {
        if (!filters.fuelTypes.includes(car.fuel_type)) {
          return false;
        }
      }

      // Certified condition filter
      if (filters.condition && car.condition !== filters.condition) {
        return false;
      }

      // Max price filter
      if (carPrice > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [cars, filters]);

  // Handle Search submit from Hero section
  const handleHeroSearch = (params: {
    searchTerm: string;
    location: string;
    priceRange: string;
    isCertified: boolean;
  }) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: params.searchTerm,
      location: params.location,
      condition: params.isCertified ? "Certified Pre-Owned" : "",
    }));

    // Smooth scroll down to listings
    const listingsEl = document.getElementById("listings");
    if (listingsEl) {
      listingsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (carId: string) => {
    setFavorites((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        return [...prev, carId];
      }
    });
  };

  // Add new car from ListCarModal
  const handleCarAdded = (newCar: Car) => {
    setCars((prev) => [newCar, ...prev]);
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
      location: "",
      carTypes: [],
      fuelTypes: [],
      minPrice: 0,
      maxPrice: 50000,
      transmission: [],
      seats: [],
      condition: "",
      sortBy: "recommended",
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Header / Navbar with Car4U branding */}
      <Navbar
        onOpenListCarModal={() => setShowListCarModal(true)}
        favoritesCount={favorites.length}
      />

      {/* 2. Hero Section for Used Car Sales */}
      <HeroSection onSearch={handleHeroSearch} />

      {/* 3. Main Used Cars Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Filter Bar */}
        <FilterBar
          totalCount={3000}
          filters={filters}
          onFilterChange={setFilters}
          showMap={showMap}
          onToggleMap={() => setShowMap(!showMap)}
          onOpenSettings={() => setShowSettingsModal(true)}
        />

        {/* Optional Map View */}
        {showMap && (
          <MapView
            cars={filteredCars}
            onSelectCar={(car) => setSelectedCar(car)}
            onClose={() => setShowMap(false)}
          />
        )}

        {/* 2-Column Used Car Cards Grid */}
        <CarGrid
          cars={filteredCars}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectCar={(car) => setSelectedCar(car)}
          onResetFilters={handleResetFilters}
        />

        {/* Pagination Bar */}
        <Pagination
          currentPage={currentPage}
          totalPages={66}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* Modals */}
      <CarModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        onBookingSuccess={() => {}}
      />

      <ListCarModal
        isOpen={showListCarModal}
        onClose={() => setShowListCarModal(false)}
        onCarAdded={handleCarAdded}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
}
