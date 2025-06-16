/**
 * Smart Bunk Management System(S.B.M.S) v1.0 

 * Calculates how many lectures a student can safely bunk per subject
 * while staying above a required attendance percentage.
 *
 * @param {Array} data - Array of subject objects { subject, attend, total }
 * @param {Number} requiredPercentage - Minimum attendance percentage (e.g., 0.75 for 75%)
 * @returns {Array} - Array of results: { subject, allocatedBunks }
 */


function calculateSmartBunks(data, requiredPercentage = 0.75) {

			// Step 1: Calculate overall totals
			const totalAttended = data.reduce((sum, subj) => sum + subj.attend, 0);
			const totalConducted = data.reduce((sum, subj) => sum + subj.total, 0);

			// Step 2: Prevent division by zero
			if (totalConducted === 0) {
				return data.map((subj) => ({
					subject: subj.subject,
					allocatedBunks: 0,
				}));
			}

			// Step 3: Compute total number of lectures that can be bunked safely
			const maxBunks = Math.floor((totalAttended - requiredPercentage * totalConducted) / requiredPercentage);
			const totalBunksAvailable = Math.max(0, maxBunks); // Never negative

			// Step 4: Analyze each subject for its individual buffer and bunk room
			const subjectInfo = data.map((subj) => {
				const currentPercent = subj.attend / subj.total;
				const buffer = currentPercent - requiredPercentage;
				const maxSafeBunks = Math.max(0, Math.floor(subj.attend / requiredPercentage - subj.total));

				return { ...subj, buffer, maxSafeBunks };
			});

			// Step 5: Filter only subjects with some buffer
			const safeSubjects = subjectInfo.filter((subj) => subj.buffer > 0);

			// Step 6: Calculate total buffer for proportional distribution
			const bufferSum = safeSubjects.reduce((sum, subj) => sum + subj.buffer, 0);

			// Step 7: Distribute bunks proportionally based on buffer size
			let distributed = safeSubjects.map((subj) => {
				const weight = subj.buffer / bufferSum;
				const tentative = Math.floor(weight * totalBunksAvailable);
				const allocated = Math.min(tentative, subj.maxSafeBunks); // Don’t exceed per-subject max

				return {
					subject: subj.subject,
					allocatedBunks: allocated,
					maxSafeBunks: subj.maxSafeBunks,
				};
			});

			// Step 8: Greedy redistribution of any leftover bunks
			let distributedTotal = distributed.reduce((sum, subj) => sum + subj.allocatedBunks, 0);
			let leftover = totalBunksAvailable - distributedTotal;

			while (leftover > 0) {
				let added = false;

				for (let subj of distributed) {
					if (subj.allocatedBunks < subj.maxSafeBunks) {
						subj.allocatedBunks++;
						leftover--;
						added = true;

						if (leftover === 0) break;
					}
				}

				// Break loop if no subject can accept more bunks
				if (!added) break;
			}

			// Step 9: Final result — include all subjects (even zero-bunk ones)
			const allSubjects = data.map((subj) => {
				const found = distributed.find((d) => d.subject === subj.subject);

				return {
					subject: subj.subject,
					allocatedBunks: found ? found.allocatedBunks : 0,
				};
			});

			return allSubjects;
		}
