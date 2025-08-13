'use client'

import React from 'react'
import Image from 'next/image'
import { PencilLine } from 'lucide-react'

export default function AffiliationPage() {
  const partners = [
    {
      type: 'partners',
      logo: '/logos/studygroup.png',
      name: 'Study Group',
      description:
        'Through our university partnerships and innovative face-to-face, online, and hybrid study programmes, Study Group guides thousands of international students each year towards academic and professional success – creating opportunities for the next generation of industry experts. Our courses range from pathways to undergraduate and postgraduate study delivered in partnership with universities across the world, to the specialist online delivery of medical and executive education with global leaders, such as Imperial College London and ETH Zurich.',
      link: 'https://www.studygroup.com/',
      status: 'Published',
    },
    {
      type: 'partners',
      logo: '/logos/qa.png',
      name: 'QA',
      description:
        'Our aim is to give students from all around the world access to outstanding higher education. We believe flexibility is the key to powering the potential of our students, staff, and communities for the digital revolution. We partner with universities to deliver our students the best learning experience from foundation programmes through to postgraduate degrees in city centre locations across the UK.',
      link: 'https://qahighereducation.com/',
      status: 'Published',
    },
  ]

  return (
    <div className="space-y-6 px-6">
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-300">
              <option>Select One</option>
              <option>partners</option>
              <option>affiliation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input placeholder="Enter Name" className="w-full px-3 py-2 rounded-lg border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-300">
              <option>Select Status</option>
              <option>Published</option>
              <option>Unpublished</option>
            </select>
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
          <h2 className="text-2xl font-semibold text-gray-800">Our Affiliation Or Partners</h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow bg-white border hover:bg-gray-50">
            <span className="text-xl">➕</span>
            Create Affiliation Or Partner
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-gray-700 text-left">
                <th className="py-3 px-4">SL</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Logo</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Link</th>
                <th className="py-3 px-4">status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">{p.type}</td>
                  <td className="py-3 px-4">
                    <Image src={p.logo} alt="logo" width={60} height={60} className="rounded-md" />
                  </td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4 whitespace-pre-line max-w-3xl">{p.description}</td>
                  <td className="py-3 px-4">
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      {p.link}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="inline-flex items-center justify-center rounded-lg bg-amber-400 text-amber-950 h-9 w-9 shadow-sm hover:bg-amber-500 transition">
                      <PencilLine size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-sm text-gray-600">
            Total <span className="font-semibold">{partners.length}</span> Affiliation & Partner(s) found.
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-white border text-sm">&lt;</button>
            <button className="px-3 py-1 rounded bg-indigo-800 text-white text-sm">1</button>
            <button className="px-3 py-1 rounded bg-white border text-sm">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
