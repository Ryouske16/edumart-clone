'use client'

import React from 'react'
import { PencilLine } from 'lucide-react'

export default function OffersPage() {
  const offers = [
    {
      duration: '2',
      location: 'UK',
      lastDate: 'Sep 30, 2023',
      discipline: 'BBA',
      tuitionFee: '55555',
      format:
        'Navitas is a leading global education provider that has helped generations of learners transform their lives through education. We create life-changing opportunities to learn by delivering an extensive range of educational services to over 70,000 aspirational students across our global network each year.',
      attendance: '5',
      degreeType: '4',
      link: 'https://example.com',
      description:
        'Navitas is a leading global education provider that has helped generations of learners transform their lives through education. We create life-changing opportunities to learn by delivering an extensive range of educational services to over 70,000 aspirational students across our global network each year.',
      status: 'Unpublished',
    },
  ]

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              placeholder="Enter location"
              className="w-full px-3 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-300">
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Duration</label>
            <input
              placeholder="Enter course duration"
              className="w-full px-3 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last date of enrollment</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex md:justify-start">
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-700 to-black text-white shadow hover:opacity-95">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-2xl font-semibold text-gray-800">Our offers</h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow bg-white border hover:bg-gray-50">
            <span className="text-xl">➕</span>
            Create Offer
          </button>
        </div>

        <div className="mt-4 overflow-x-auto px-5 pb-4">
          <div className="overflow-auto min-w-[1500px]">
            <table className="min-w-full table-auto border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Duration</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Last date of enrollment</th>
                  <th className="p-2">Discipline</th>
                  <th className="p-2">Tuition Fee</th>
                  <th className="p-2">Format</th>
                  <th className="p-2">Attendance</th>
                  <th className="p-2">Degree Type</th>
                  <th className="p-2">Link</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, idx) => (
                  <tr key={idx} className="bg-white shadow rounded">
                    <td className="p-2 align-top">{offer.duration}</td>
                    <td className="p-2 align-top">{offer.location}</td>
                    <td className="p-2 align-top">{offer.lastDate}</td>
                    <td className="p-2 align-top">{offer.discipline}</td>
                    <td className="p-2 align-top">{offer.tuitionFee}</td>
                    <td className="p-2 align-top max-w-[400px] whitespace-normal">{offer.format}</td>
                    <td className="p-2 align-top">{offer.attendance}</td>
                    <td className="p-2 align-top">{offer.degreeType}</td>
                    <td className="p-2 align-top">
                      <a href={offer.link} target="_blank" className="text-blue-600 underline">Link</a>
                    </td>
                    <td className="p-2 align-top max-w-[400px] whitespace-normal">{offer.description}</td>
                    <td className="p-2 align-top">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {offer.status}
                      </span>
                    </td>
                    <td className="p-2 align-top">
                      <button className="inline-flex items-center justify-center rounded-lg bg-amber-400 text-amber-950 h-9 w-9 shadow-sm hover:bg-amber-500 transition">
                        <PencilLine size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-sm text-gray-600">
            Total <span className="font-semibold">{offers.length}</span> offer(s) found.
          </div>
        </div>
      </div>
    </div>
  )
}
