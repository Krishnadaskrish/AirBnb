// AdminListingCard.tsx

import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import React from "react";
import { SafeListing } from "@/app/types";

interface AdminListingProps {
    data: SafeListing;
}

const AdminListingCard: React.FC<AdminListingProps> = ({ data }) => {
    return (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
            <div className="overflow-y-hidden rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody className="text-black-500">
                            <tr className="bg-rose-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th className="px-5 py-3" colSpan={5}>Property information</th>
                            </tr>
                            <tr>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">ID: {data.id}</p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <Avatar src={data.imageSrc} />
                                        </div>
                                        <div className="ml-3">
                                            <p className="whitespace-no-wrap">Titile: {data.title}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">Category: {data.category}</p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">Created at: {data.locationValue}</p>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminListingCard;
