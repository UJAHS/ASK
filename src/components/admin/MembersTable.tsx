"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Member = {
  id: string;
  memberNumber: number;
  email: string;
  role: string;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "BLOCKED";
  createdAt: string;
  profile: {
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    city?: string | null;
    state?: string | null;
  } | null;
};

export default function MembersTable({
  initialMembers,
}: {
  initialMembers: Member[];
}) {
  const [members, setMembers] =
    useState<Member[]>(initialMembers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  const filteredMembers = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return members.filter((member) => {
      const fullName = [
        member.profile?.firstName,
        member.profile?.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      const memberId =
        `ASK-${new Date(member.createdAt).getFullYear()}-${String(
          member.memberNumber
        ).padStart(6, "0")}`;

      const matchesSearch =
        !searchText ||
        fullName
          .toLowerCase()
          .includes(searchText) ||
        member.email
          .toLowerCase()
          .includes(searchText) ||
        (member.profile?.phone || "")
          .toLowerCase()
          .includes(searchText) ||
        memberId
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  async function updateStatus(
    id: string,
    status: Member["status"]
  ) {
    try {
      setError("");
      setLoadingId(id);

      const response = await fetch(
        `/api/admin/members/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update member."
        );
      }

      setMembers((current) =>
        current.map((member) =>
          member.id === id
            ? {
                ...member,
                status,
              }
            : member
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoadingId(null);
    }
  }

  async function deleteMember(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setLoadingId(id);

      const response = await fetch(
        `/api/admin/members/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete member."
        );
      }

      setMembers((current) =>
        current.filter(
          (member) => member.id !== id
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoadingId(null);
    }
  }

  function getMemberId(member: Member) {
    return `ASK-${new Date(
      member.createdAt
    ).getFullYear()}-${String(
      member.memberNumber
    ).padStart(6, "0")}`;
  }

  function getName(member: Member) {
    const name = [
      member.profile?.firstName,
      member.profile?.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    return name || "Unnamed Member";
  }

  function getStatusClass(
    status: Member["status"]
  ) {
    switch (status) {
      case "APPROVED":
        return `
          border
          border-green-300
          bg-green-50
          text-green-700
          dark:border-green-400/40
          dark:bg-green-900/20
          dark:text-green-300
        `;

      case "PENDING":
        return `
          border
          border-orange-300
          bg-orange-50
          text-orange-700
          dark:border-orange-400/40
          dark:bg-orange-900/20
          dark:text-orange-300
        `;

      case "REJECTED":
        return `
          border
          border-red-300
          bg-red-50
          text-red-700
          dark:border-red-400/40
          dark:bg-red-900/30
          dark:text-red-300
        `;

      case "BLOCKED":
        return `
          border
          border-gray-300
          bg-gray-100
          text-gray-700
          dark:border-red-300/20
          dark:bg-[#2f070d]
          dark:text-red-200
        `;

      default:
        return `
          border
          border-gray-300
          bg-gray-100
          text-gray-700
          dark:border-red-300/20
          dark:bg-[#3d0b14]
          dark:text-red-200
        `;
    }
  }

  return (
    <div className="space-y-5">

      {/* Error */}
      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-300
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700

            dark:border-red-400/30
            dark:bg-[#5c0d18]
            dark:text-red-100
          "
        >
          {error}
        </div>
      )}

      {/* Search / Filter */}
      <div
        className="
          rounded-2xl
          border
          border-red-200/70
          bg-gradient-to-br
          from-[#fff0f2]
          via-[#ffe0e5]
          to-[#ffd0d8]
          p-5
          shadow-lg
          shadow-red-950/5

          dark:border-red-400/20
          dark:from-[#68131f]
          dark:via-[#5a0f19]
          dark:to-[#430912]
          dark:shadow-red-950/20
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-3
          "
        >
          {/* Search */}
          <div className="md:col-span-2">
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-900

                dark:text-red-100
              "
            >
              Search Members
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by name, email, phone or membership ID..."
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-sm
                text-red-950
                outline-none
                placeholder:text-red-900/35
                transition-all

                focus:border-red-400
                focus:ring-2
                focus:ring-red-200/60

                dark:border-red-300/25
                dark:bg-[#3b0710]
                dark:text-red-50
                dark:placeholder:text-red-100/40
                dark:focus:border-red-300/60
                dark:focus:ring-red-400/20
              "
            />
          </div>

          {/* Status */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-red-900

                dark:text-red-100
              "
            >
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-red-200
                bg-[#fff7f8]
                px-4
                py-3
                text-sm
                text-red-950
                outline-none
                transition-all

                focus:border-red-400
                focus:ring-2
                focus:ring-red-200/60

                dark:border-red-300/25
                dark:bg-[#3b0710]
                dark:text-red-50
                dark:focus:border-red-300/60
                dark:focus:ring-red-400/20
              "
            >
              <option
                value="ALL"
                className="bg-[#fff7f8] text-red-950 dark:bg-[#3b0710] dark:text-red-50"
              >
                All Statuses
              </option>

              <option
                value="PENDING"
                className="bg-[#fff7f8] text-red-950 dark:bg-[#3b0710] dark:text-red-50"
              >
                Pending
              </option>

              <option
                value="APPROVED"
                className="bg-[#fff7f8] text-red-950 dark:bg-[#3b0710] dark:text-red-50"
              >
                Approved
              </option>

              <option
                value="REJECTED"
                className="bg-[#fff7f8] text-red-950 dark:bg-[#3b0710] dark:text-red-50"
              >
                Rejected
              </option>

              <option
                value="BLOCKED"
                className="bg-[#fff7f8] text-red-950 dark:bg-[#3b0710] dark:text-red-50"
              >
                Blocked
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-red-200/70
          bg-[#ffe8ed]
          shadow-lg
          shadow-red-950/5

          dark:border-red-400/20
          dark:bg-[#4b0b15]
          dark:shadow-red-950/20
        "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">

            {/* Header */}
            <thead
              className="
                border-b
                border-red-200/70
                bg-gradient-to-r
                from-[#ffdfe5]
                via-[#ffd5dc]
                to-[#ffccd5]

                dark:border-red-300/15
                dark:from-[#68131f]
                dark:via-[#5c101a]
                dark:to-[#4b0c15]
              "
            >
              <tr>
                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  Member
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  Contact
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  Location
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  Registered
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-right
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-red-900

                    dark:text-red-100
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody
              className="
                divide-y
                divide-red-200/60

                dark:divide-red-300/10
              "
            >
              {filteredMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="
                      bg-[#ffe8ed]
                      px-5
                      py-12
                      text-center
                      text-red-800/60

                      dark:bg-[#4b0b15]
                      dark:text-red-100/60
                    "
                  >
                    No members found.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="
                      bg-[#ffe8ed]
                      transition-all
                      duration-200
                      hover:bg-[#ffd9e0]

                      dark:bg-[#4b0b15]
                      dark:hover:bg-[#68131f]
                    "
                  >
                    {/* Member */}
                    <td className="px-5 py-4">
                      <div
                        className="
                          font-semibold
                          text-red-950

                          dark:text-red-50
                        "
                      >
                        {getName(member)}
                      </div>

                      <div
                        className="
                          mt-1
                          text-xs
                          font-semibold
                          text-red-700

                          dark:text-red-300
                        "
                      >
                        {getMemberId(member)}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div
                        className="
                          text-sm
                          font-medium
                          text-red-950

                          dark:text-red-50
                        "
                      >
                        {member.email}
                      </div>

                      <div
                        className="
                          mt-1
                          text-xs
                          text-red-800/60

                          dark:text-red-100/55
                        "
                      >
                        {member.profile?.phone ||
                          "No phone"}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <div
                        className="
                          text-sm
                          text-red-900/80

                          dark:text-red-100/85
                        "
                      >
                        {[
                          member.profile?.city,
                          member.profile?.state,
                        ]
                          .filter(Boolean)
                          .join(", ") ||
                          "Not provided"}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-bold
                          ${getStatusClass(
                            member.status
                          )}
                        `}
                      >
                        {member.status}
                      </span>
                    </td>

                    {/* Registered */}
                    <td
                      className="
                        px-5
                        py-4
                        text-sm
                        text-red-800/70

                        dark:text-red-100/70
                      "
                    >
                      {new Date(
                        member.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div
                        className="
                          flex
                          flex-wrap
                          justify-end
                          gap-2
                        "
                      >
                        {/* View */}
                        <Link
                          href={`/admin/members/${member.id}`}
                          className="
                            rounded-lg
                            border
                            border-red-300
                            bg-[#ffdfe5]
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-800
                            transition-all

                            hover:border-red-400
                            hover:bg-[#ffccd5]
                            hover:text-red-950

                            dark:border-red-300/25
                            dark:bg-[#5c101a]
                            dark:text-red-100
                            dark:hover:border-red-300/50
                            dark:hover:bg-[#751a28]
                            dark:hover:text-white
                          "
                        >
                          View
                        </Link>

                        {/* Pending */}
                        {member.status ===
                          "PENDING" && (
                          <>
                            <button
                              disabled={
                                loadingId ===
                                member.id
                              }
                              onClick={() =>
                                updateStatus(
                                  member.id,
                                  "APPROVED"
                                )
                              }
                              className="
                                rounded-lg
                                border
                                border-green-300
                                bg-green-50
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-green-700
                                transition-all
                                hover:bg-green-100
                                disabled:cursor-not-allowed
                                disabled:opacity-50

                                dark:border-green-400/30
                                dark:bg-green-900/25
                                dark:text-green-300
                                dark:hover:bg-green-800/40
                              "
                            >
                              Approve
                            </button>

                            <button
                              disabled={
                                loadingId ===
                                member.id
                              }
                              onClick={() =>
                                updateStatus(
                                  member.id,
                                  "REJECTED"
                                )
                              }
                              className="
                                rounded-lg
                                border
                                border-red-300
                                bg-red-50
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                text-red-700
                                transition-all
                                hover:bg-red-100
                                disabled:cursor-not-allowed
                                disabled:opacity-50

                                dark:border-red-400/35
                                dark:bg-red-900/30
                                dark:text-red-300
                                dark:hover:bg-red-800/40
                              "
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {/* Approved */}
                        {member.status ===
                          "APPROVED" && (
                          <button
                            disabled={
                              loadingId ===
                              member.id
                            }
                            onClick={() =>
                              updateStatus(
                                member.id,
                                "BLOCKED"
                              )
                            }
                            className="
                              rounded-lg
                              border
                              border-orange-300
                              bg-orange-50
                              px-3
                              py-2
                              text-xs
                              font-semibold
                              text-orange-700
                              transition-all
                              hover:bg-orange-100
                              disabled:cursor-not-allowed
                              disabled:opacity-50

                              dark:border-orange-400/35
                              dark:bg-orange-900/25
                              dark:text-orange-300
                              dark:hover:bg-orange-800/40
                            "
                          >
                            Block
                          </button>
                        )}

                        {/* Blocked */}
                        {member.status ===
                          "BLOCKED" && (
                          <button
                            disabled={
                              loadingId ===
                              member.id
                            }
                            onClick={() =>
                              updateStatus(
                                member.id,
                                "APPROVED"
                              )
                            }
                            className="
                              rounded-lg
                              border
                              border-green-300
                              bg-green-50
                              px-3
                              py-2
                              text-xs
                              font-semibold
                              text-green-700
                              transition-all
                              hover:bg-green-100
                              disabled:cursor-not-allowed
                              disabled:opacity-50

                              dark:border-green-400/30
                              dark:bg-green-900/25
                              dark:text-green-300
                              dark:hover:bg-green-800/40
                            "
                          >
                            Unblock
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          disabled={
                            loadingId ===
                            member.id
                          }
                          onClick={() =>
                            deleteMember(
                              member.id
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-red-300
                            bg-red-50
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-700
                            transition-all
                            hover:bg-red-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50

                            dark:border-red-400/35
                            dark:bg-red-900/25
                            dark:text-red-300
                            dark:hover:bg-red-800/40
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          className="
            border-t
            border-red-200/70
            bg-gradient-to-r
            from-[#ffdfe5]
            via-[#ffd5dc]
            to-[#ffccd5]
            px-5
            py-3
            text-sm
            text-red-800/70

            dark:border-red-300/15
            dark:from-[#68131f]
            dark:via-[#5c101a]
            dark:to-[#4b0c15]
            dark:text-red-100/65
          "
        >
          Showing{" "}
          <span
            className="
              font-bold
              text-red-900

              dark:text-red-100
            "
          >
            {filteredMembers.length}
          </span>{" "}
          of{" "}
          <span
            className="
              font-bold
              text-red-900

              dark:text-red-100
            "
          >
            {members.length}
          </span>{" "}
          members
        </div>
      </div>
    </div>
  );
}